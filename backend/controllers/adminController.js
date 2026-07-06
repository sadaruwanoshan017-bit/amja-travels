const { db } = require('../config/firebase');

// Collection name for admin settings
const ADMIN_COLLECTION = 'admin_settings';
const ADMIN_DOC_ID = 'credentials';

// Default credentials (used when first time)
const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // In production, this should be hashed
};

// Get admin credentials
async function getAdminCredentials() {
  try {
    const doc = await db.collection(ADMIN_COLLECTION).doc(ADMIN_DOC_ID).get();
    
    if (!doc.exists) {
      // Create default credentials if not exists
      await db.collection(ADMIN_COLLECTION).doc(ADMIN_DOC_ID).set(DEFAULT_CREDENTIALS);
      return DEFAULT_CREDENTIALS;
    }
    
    return doc.data();
  } catch (error) {
    console.error('Error getting admin credentials:', error);
    return DEFAULT_CREDENTIALS;
  }
}

// Login handler
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const credentials = await getAdminCredentials();

    // Simple check (in production, use hashed passwords)
    if (username === credentials.username && password === credentials.password) {
      return res.json({ success: true, message: 'Login successful' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update admin credentials
exports.updateCredentials = async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body;

    if (!currentPassword || !newUsername || !newPassword) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    const credentials = await getAdminCredentials();

    // Verify current password
    if (currentPassword !== credentials.password) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // Update credentials
    const updates = {
      username: newUsername,
      password: newPassword,
      updated_at: new Date().toISOString()
    };

    await db.collection(ADMIN_COLLECTION).doc(ADMIN_DOC_ID).set(updates, { merge: true });

    res.json({ success: true, message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Update credentials error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get current credentials (for settings page - only show username)
exports.getCredentials = async (req, res) => {
  try {
    const credentials = await getAdminCredentials();
    res.json({ success: true, username: credentials.username });
  } catch (error) {
    console.error('Get credentials error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};