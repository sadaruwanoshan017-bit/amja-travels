// ─────────────────────────────────────────────────────────────
// Enquiries controller.
// Clients submit an enquiry from any page (category). Admins view
// them per category, mark as read/handled, and get unread counts
// for the notification system.
//
// Stored in one Firestore collection "enquiries" with a `category`
// field, so we can query per category and count unread globally.
// ─────────────────────────────────────────────────────────────
const { db } = require('../config/firebase');
const { getCategory, getEnquiryFields } = require('../config/categories');

const COLLECTION = 'enquiries';

// POST /api/enquiries/:category  → client submits an enquiry
exports.create = async (req, res) => {
  const cat = (req.params.category || '').toLowerCase();
  // Allow "general" for the landing/contact page in addition to real categories.
  if (cat !== 'general' && !getCategory(cat)) {
    return res.status(404).json({ success: false, error: 'Unknown category' });
  }

  try {
    const { name, email, phone, message, item_id, item_title } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone are required' });
    }

    const data = {
      category: cat,
      name: String(name).trim(),
      email: email ? String(email).trim() : '',
      phone: String(phone).trim(),
      message: message ? String(message).trim() : '',
      item_id: item_id ? String(item_id).trim() : '',        // optional: which package they asked about
      item_title: item_title ? String(item_title).trim() : '',
      read: false,
      handled: false,
      created_at: new Date().toISOString(),
    };

    // Persist the per-category extra fields (fleet: pickup_date/rental_days/...,
    // tours: travel_date/people/tour_type, hajj/umrah: preferred_month/pax, etc.)
    // Stored under `details` so the admin can display them without cluttering the top level.
    const extraKeys = getEnquiryFields(cat);
    const details = {};
    extraKeys.forEach((k) => {
      if (req.body[k] !== undefined && req.body[k] !== null && String(req.body[k]).trim() !== '') {
        details[k] = String(req.body[k]).trim();
      }
    });
    if (Object.keys(details).length) data.details = details;

    const ref = await db.collection(COLLECTION).add(data);
    res.json({ success: true, message: 'Enquiry submitted successfully', data: { id: ref.id, ...data } });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/enquiries/:category  → admin lists enquiries for a category
exports.listByCategory = async (req, res) => {
  const cat = (req.params.category || '').toLowerCase();
  try {
    let query = db.collection(COLLECTION).where('category', '==', cat);
    const snapshot = await query.get();
    let items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // Sort newest first in memory (avoids needing a composite index).
    items.sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''));
    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Error listing enquiries:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/enquiries/counts  → unread counts per category + total (for notifications)
exports.counts = async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).where('read', '==', false).get();
    const byCategory = {};
    let total = 0;
    snapshot.docs.forEach((doc) => {
      const cat = doc.data().category || 'general';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
      total += 1;
    });
    res.json({ success: true, total, byCategory });
  } catch (error) {
    console.error('Error counting enquiries:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// PUT /api/enquiries/item/:id  → mark read / handled
exports.updateStatus = async (req, res) => {
  try {
    const ref = db.collection(COLLECTION).doc(req.params.id);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ success: false, error: 'Enquiry not found' });

    const updates = {};
    if (typeof req.body.read === 'boolean') updates.read = req.body.read;
    if (typeof req.body.handled === 'boolean') updates.handled = req.body.handled;
    updates.updated_at = new Date().toISOString();

    await ref.set(updates, { merge: true });
    res.json({ success: true, message: 'Enquiry updated' });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE /api/enquiries/item/:id
exports.remove = async (req, res) => {
  try {
    await db.collection(COLLECTION).doc(req.params.id).delete();
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
