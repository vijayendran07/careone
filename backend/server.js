const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://careone-ft4z.onrender.com',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    // Allow any Vercel/Netlify preview deployments too
    if (origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app')) {
      return callback(null, true);
    }
    return callback(null, true); // Open CORS for now - lock down after testing
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route files
const appointmentRoutes = require('./routes/appointmentRoutes');
const contentRoutes = require('./routes/contentRoutes');
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const galleryRoutes = require('./routes/galleryRoutes');

// Mount routers
app.use('/api/appointments', appointmentRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Care One API is running with MongoDB' });
});

const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname, '../frontend/dist');
const indexPath = path.join(distPath, 'index.html');

// Always serve static files if built
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  console.log('Serving frontend static files from:', distPath);
}

// SPA catch-all: ALWAYS serve index.html for non-API GET requests
// This handles page refreshes on /admin/dashboard, /login, etc.
app.get(/.*/, (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: `API route '${req.path}' not found` });
  }
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  // If no built frontend, return a helpful message
  res.status(200).send(`
    <!DOCTYPE html>
    <html><body style="font-family:sans-serif;padding:2rem">
      <h2>CareOne API is running ✅</h2>
      <p>Frontend not built. <a href="/api/health">Check API health</a></p>
    </body></html>
  `);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Care One API server running on port ${PORT}`);
});
