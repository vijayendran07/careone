const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Appointment = require('./models/Appointment');

dotenv.config();

const checkApts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const apts = await Appointment.find({});
    console.log(`Found ${apts.length} appointments:`, apts);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkApts();
