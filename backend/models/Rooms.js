const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: Number,
  type: String,
  price: Number,
  status: {
    type: String,
    enum: ["available", "occupied"],
    default: "available"
  },
  // representative main image (legacy/compat)
  image: { type: String, default: '' },
  // gallery of images for the room
  images: { type: [String], default: [] }
});

module.exports = mongoose.model("Room", roomSchema);
