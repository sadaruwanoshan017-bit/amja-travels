// ─────────────────────────────────────────────────────────────
// One-time seed script.
// Loads the extracted hardcoded listings into Firestore so they
// become admin-managed items. Writes straight to Firestore (no
// server needed).
//
// Run from the project root:
//     node backend/seed/seed.js          → seeds only empty categories
//     node backend/seed/seed.js --force  → seeds even if items exist
//
// Safe to re-run: by default it SKIPS a category that already has
// documents, so you won't get duplicates.
// ─────────────────────────────────────────────────────────────
const { db } = require('../config/firebase');
const { getCategory } = require('../config/categories');
const seedData = require('./seedData');

const FORCE = process.argv.includes('--force');

async function seedCategory(cat, items) {
  const catConfig = getCategory(cat);
  if (!catConfig) {
    console.log(`⚠️  Skipping unknown category "${cat}"`);
    return;
  }

  const col = db.collection(catConfig.collection);
  const existing = await col.get();

  // Natural key = the category's first field (name / title / route).
  const keyField = catConfig.fields[0];
  const existingKeys = new Set(
    existing.docs.map((d) => String(d.data()[keyField] || '').trim().toLowerCase())
  );

  let added = 0;
  let skipped = 0;
  for (const item of items) {
    const key = String(item[keyField] || '').trim().toLowerCase();
    // Skip items that already exist (matched by name/title), unless --force.
    if (!FORCE && key && existingKeys.has(key)) {
      skipped++;
      continue;
    }
    const now = new Date().toISOString();
    await col.add({ ...item, created_at: now, updated_at: now });
    added++;
  }

  if (added && skipped) console.log(`✅ ${cat}: added ${added} new item(s), skipped ${skipped} existing`);
  else if (added) console.log(`✅ ${cat}: added ${added} item(s) into "${catConfig.collection}"`);
  else console.log(`⏭️  ${cat}: nothing new to add (${skipped} already exist)`);
}

async function run() {
  console.log(`\n🌱 Seeding Amja Travels data${FORCE ? ' (FORCE mode)' : ''}...\n`);
  try {
    for (const [cat, items] of Object.entries(seedData)) {
      await seedCategory(cat, items);
    }
    console.log('\n🎉 Done. Open the admin panel to edit prices, images and details.\n');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Seed failed:', err.message);
    process.exit(1);
  }
}

run();
