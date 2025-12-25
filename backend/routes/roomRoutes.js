const express = require("express");
const Room = require("../models/Rooms");
const Booking = require('../models/Booking');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Add room (admin)
router.post("/add", verifyToken, isAdmin, async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json({ message: "Room added" });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// List rooms (auth)
router.get("/", verifyToken, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get single room by id
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: 'Not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get available rooms in a date range
// GET /api/rooms/available?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/available', verifyToken, async (req, res) => {
  try {
    const { from, to } = req.query;
    if (!from || !to) return res.status(400).json({ message: 'from and to query params required' });
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // find bookings that overlap the requested window
    const overlapping = await Booking.find({
      $or: [
        { from: { $lte: toDate }, to: { $gte: fromDate } }
      ]
    });

    const bookedRoomNumbers = overlapping.map(b => Number(b.room));
    const rooms = await Room.find({ roomNumber: { $nin: bookedRoomNumbers } });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update room (admin)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete room (admin)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
