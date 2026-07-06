const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// ─────────────────────────────────────────────────────────────
// Load Firebase credentials.
// LOCAL: use serviceAccountKey.json on disk (exactly as before).
// DEPLOYED (Vercel): the file isn't uploaded, so read the SAME JSON
//   from the FIREBASE_SERVICE_ACCOUNT environment variable.
// Either way the credentials are identical → same Firebase connection.
// ─────────────────────────────────────────────────────────────
let serviceAccount;
const keyPath = path.join(__dirname, 'serviceAccountKey.json');

if (fs.existsSync(keyPath)) {
  // Local development — unchanged from before.
  serviceAccount = require('./serviceAccountKey.json');
} else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // Deployed — same JSON, delivered via env var.
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  throw new Error(
    'Firebase credentials not found. Add serviceAccountKey.json locally, ' +
    'or set the FIREBASE_SERVICE_ACCOUNT environment variable when deployed.'
  );
}

// Initialize
initializeApp({
  credential: cert(serviceAccount)
});

console.log('✅ Firebase initialized successfully');

const db = getFirestore();

module.exports = { db };
