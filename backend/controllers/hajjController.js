const { db } = require('../config/firebase');

const COLLECTION = 'hajj_package';
const DOC_ID = 'main';

// Get Hajj package
exports.getHajjPackage = async (req, res) => {
  try {
    const doc = await db.collection(COLLECTION).doc(DOC_ID).get();
    
    if (!doc.exists) {
      // Return default empty structure
      return res.json({
        success: true,
        data: {
          title: '',
          badge: '',
          description: '',
          price: '',
          image_url: '',
          includes: ['', '', '', '', '', '']
        }
      });
    }
    
    res.json({ success: true, data: doc.data() });
  } catch (error) {
    console.error('Error fetching Hajj package:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update Hajj package
exports.updateHajjPackage = async (req, res) => {
  try {
    const { title, badge, description, price, image_url, includes } = req.body;
    
    const updateData = {
      title,
      badge,
      description,
      price,
      image_url: image_url || '',
      includes: includes || [],
      updated_at: new Date().toISOString()
    };
    
    await db.collection(COLLECTION).doc(DOC_ID).set(updateData, { merge: true });
    
    res.json({ 
      success: true, 
      message: 'Hajj package updated successfully',
      data: updateData
    });
  } catch (error) {
    console.error('Error updating Hajj package:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};