// ─────────────────────────────────────────────────────────────
// Generic packages controller — works for ALL categories
// (hajj, umrah, tours, hotels, fleet, flights).
//
// Each category is a Firestore collection; each item is a document
// with an auto-generated ID. Admin can add / edit / delete freely,
// and the client pages read the full list.
// ─────────────────────────────────────────────────────────────
const { db } = require('../config/firebase');
const { getCategory } = require('../config/categories');

// Build a clean data object containing only allowed fields for the category.
function buildData(catConfig, body) {
  const data = {};
  catConfig.fields.forEach((field) => {
    if (body[field] === undefined) return;
    if (catConfig.arrays.includes(field)) {
      // Ensure array fields are arrays, dropping empty entries.
      const arr = Array.isArray(body[field]) ? body[field] : [body[field]];
      data[field] = arr.map((v) => (v == null ? '' : String(v).trim())).filter((v) => v !== '');
    } else {
      data[field] = body[field] == null ? '' : String(body[field]).trim();
    }
  });
  return data;
}

// Validate required fields are present and non-empty.
function validateRequired(catConfig, data) {
  const missing = catConfig.required.filter((f) => !data[f] || data[f].length === 0);
  return missing;
}

// Validate any select fields hold an allowed option value.
function validateOptions(catConfig, data) {
  const opts = catConfig.options || {};
  const bad = [];
  Object.keys(opts).forEach((field) => {
    if (data[field] && !opts[field].includes(data[field])) {
      bad.push(`${field} must be one of: ${opts[field].join(', ')}`);
    }
  });
  return bad;
}

// GET /api/:category  → list all items for a category
exports.list = async (req, res) => {
  const catConfig = getCategory(req.params.category);
  if (!catConfig) return res.status(404).json({ success: false, error: 'Unknown category' });

  try {
    const snapshot = await db.collection(catConfig.collection).orderBy('created_at', 'desc').get();
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: items });
  } catch (error) {
    // orderBy fails if created_at missing on old docs — fall back to unordered.
    try {
      const snapshot = await db.collection(catConfig.collection).get();
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json({ success: true, data: items });
    } catch (err2) {
      console.error(`Error listing ${req.params.category}:`, err2);
      res.status(500).json({ success: false, error: err2.message });
    }
  }
};

// GET /api/:category/:id  → single item
exports.getOne = async (req, res) => {
  const catConfig = getCategory(req.params.category);
  if (!catConfig) return res.status(404).json({ success: false, error: 'Unknown category' });

  try {
    const doc = await db.collection(catConfig.collection).doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ success: false, error: 'Item not found' });
    res.json({ success: true, data: { id: doc.id, ...doc.data() } });
  } catch (error) {
    console.error(`Error fetching ${req.params.category} item:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST /api/:category  → create a new item
exports.create = async (req, res) => {
  const catConfig = getCategory(req.params.category);
  if (!catConfig) return res.status(404).json({ success: false, error: 'Unknown category' });

  try {
    const data = buildData(catConfig, req.body);
    const missing = validateRequired(catConfig, data);
    if (missing.length) {
      return res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });
    }
    const badOpts = validateOptions(catConfig, data);
    if (badOpts.length) {
      return res.status(400).json({ success: false, error: badOpts.join('; ') });
    }
    data.created_at = new Date().toISOString();
    data.updated_at = data.created_at;

    const ref = await db.collection(catConfig.collection).add(data);
    res.json({ success: true, message: 'Created successfully', data: { id: ref.id, ...data } });
  } catch (error) {
    console.error(`Error creating ${req.params.category} item:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/:category/:id  → update an item
exports.update = async (req, res) => {
  const catConfig = getCategory(req.params.category);
  if (!catConfig) return res.status(404).json({ success: false, error: 'Unknown category' });

  try {
    const ref = db.collection(catConfig.collection).doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ success: false, error: 'Item not found' });

    const data = buildData(catConfig, req.body);
    const missing = validateRequired(catConfig, data);
    if (missing.length) {
      return res.status(400).json({ success: false, error: `Missing required fields: ${missing.join(', ')}` });
    }
    const badOpts = validateOptions(catConfig, data);
    if (badOpts.length) {
      return res.status(400).json({ success: false, error: badOpts.join('; ') });
    }
    data.updated_at = new Date().toISOString();

    await ref.set(data, { merge: true });
    res.json({ success: true, message: 'Updated successfully', data: { id: req.params.id, ...data } });
  } catch (error) {
    console.error(`Error updating ${req.params.category} item:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/:category/:id  → delete an item
exports.remove = async (req, res) => {
  const catConfig = getCategory(req.params.category);
  if (!catConfig) return res.status(404).json({ success: false, error: 'Unknown category' });

  try {
    await db.collection(catConfig.collection).doc(req.params.id).delete();
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ${req.params.category} item:`, error);
    res.status(500).json({ success: false, error: error.message });
  }
};
