const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Rooms');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Create booking (auth required)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { guest, room, from, to, total } = req.body;
    if (!guest || !room || !from || !to) return res.status(400).json({ message: 'Missing required fields' });

    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (isNaN(fromDate) || isNaN(toDate) || fromDate > toDate) return res.status(400).json({ message: 'Invalid date range' });

    // Check overlapping bookings for this room
    const overlapping = await Booking.findOne({
      room: room,
      $or: [
        { from: { $lte: toDate }, to: { $gte: fromDate } }
      ]
    });

    if (overlapping) return res.status(409).json({ message: 'Room not available for selected dates' });

    const booking = new Booking({ guest, room, from: fromDate, to: toDate, total });
    await booking.save();
    // Optionally set room status to occupied
    await Room.findOneAndUpdate({ roomNumber: room }, { status: 'occupied' });
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// List bookings (admin only)
router.get('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get booking by id (auth)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete booking (admin)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;