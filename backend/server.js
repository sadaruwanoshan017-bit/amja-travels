const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const adminRoutes = require('./routes/admin');
const hajjRoutes = require('./routes/hajj');
const packagesRoutes = require('./routes/packages');
const enquiriesRoutes = require('./routes/enquiries');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (your HTML pages)
app.use(express.static(path.join(__dirname, '../pages')));
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// Also serve images folder
app.use('/images', express.static(path.join(__dirname, '../images')));

// Serve shared frontend helpers (config.js etc.)
app.use('/shared', express.static(path.join(__dirname, '../shared')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/hajj', hajjRoutes);              // legacy single-doc hajj (kept for compat)
app.use('/api/packages', packagesRoutes);      // generic CRUD for all categories
app.use('/api/enquiries', enquiriesRoutes);    // enquiry submission + admin inbox

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    timestamp: new Date().toISOString()
  });
});

// Start a normal server ONLY when run directly (local dev: `node backend/server.js`
// or nodemon). On Vercel the app is imported as a serverless function, so
// require.main !== module and we skip app.listen.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Test API: http://localhost:${PORT}/api/test`);
    console.log(`📄 Client pages: http://localhost:${PORT}/index.html`);
  });
}

// Export the Express app so Vercel can use it as a serverless function.
module.exports = app;