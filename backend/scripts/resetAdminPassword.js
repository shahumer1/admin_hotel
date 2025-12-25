require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');

function generatePassword() {
  // 16 chars: mix of upper/lower/nums/symbols
  return crypto.randomBytes(12).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0,16);
}

async function reset(password) {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@hotel.com';
  const user = await User.findOne({ email: adminEmail });
  if (!user) {
    console.error('Admin user not found:', adminEmail);
    mongoose.disconnect();
    process.exit(1);
  }

  const newPass = password || generatePassword();
  const hash = await bcrypt.hash(newPass, 10);
  user.password = hash;
  await user.save();

  console.log('Admin password updated for', adminEmail);
  console.log('New password:', newPass);

  mongoose.disconnect();
}

// If a password is passed as first arg, use it. Else generate one.
const provided = process.argv[2];
reset(provided).catch(err => {
  console.error(err);
  process.exit(1);
});
