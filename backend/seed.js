const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminExists = await User.findOne({ email: 'admin@careone.com' });
    if (!adminExists) {
      await User.create({
        name: 'CareOne Admin',
        email: 'admin@careone.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@careone.com');
      console.log('Password: adminpassword123');
    } else {
      console.log('Admin user already exists with email: admin@careone.com');
      // If it exists, let's reset the password to be sure
      adminExists.password = 'adminpassword123';
      await adminExists.save();
      console.log('Password reset to: adminpassword123');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
