const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guest: String,
  room: { type: Number, ref: 'Room' },
  from: Date,
  to: Date,
  total: String,
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);