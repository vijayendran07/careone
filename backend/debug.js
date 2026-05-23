const http = require('http');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

const makeRequest = (path, token) => {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    };
    const req = http.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', error => resolve({ error: error.message }));
    req.end();
  });
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  // Find admin user
  const admin = await User.findOne({ email: 'admin@careone.com' });
  if (!admin) {
    console.log('ERROR: Admin not found in DB!');
    process.exit(1);
  }
  console.log('Admin user:', { id: admin._id, email: admin.email, role: admin.role });

  // Generate token
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  console.log('Token generated successfully');

  // Test appointments
  const aptResult = await makeRequest('/api/appointments', token);
  console.log('\n=== GET /api/appointments ===');
  console.log('Status:', aptResult.status);
  console.log('Body:', aptResult.body.substring(0, 500));

  // Test settings
  const setResult = await makeRequest('/api/settings', token);
  console.log('\n=== GET /api/settings ===');
  console.log('Status:', setResult.status);
  console.log('Body:', setResult.body.substring(0, 500));

  mongoose.disconnect();
};

run().catch(console.error);
