const http = require('http');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const adminId = '6a1147efbc6efbde7009e9de'; // Using an arbitrary string since we just need auth
const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '1d' });

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/appointments',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => { console.log('Status:', res.statusCode); console.log('Body:', data); });
});

req.on('error', error => { console.error(error); });
req.end();
