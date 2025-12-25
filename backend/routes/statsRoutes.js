const express = require('express');
const User = require('../models/User');
const Room = require('../models/Rooms');
const Booking = require('../models/Booking');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const rooms = await Room.countDocuments();
    const bookings = await Booking.countDocuments();

    res.json({ users, rooms, bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;