require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Room = require('./models/Rooms');
const Booking = require('./models/Booking');

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected');

  // Admin user
// Admin user (CREATE OR UPDATE PASSWORD)
const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@hotel.com';
const adminPass = process.env.SEED_ADMIN_PASS || 'password';

const existing = await User.findOne({ email: adminEmail });

const hash = await bcrypt.hash(adminPass, 10);

if (!existing) {
  await User.create({
    name: 'Admin',
    email: adminEmail,
    password: hash,
    role: 'admin'
  });
  console.log('Admin user created');
} else {
  existing.password = hash;
  await existing.save();
  console.log('Admin password UPDATED');
}


  // Rooms
  const rooms = [
    { roomNumber: 101, type: 'Single', price: 3000, status: 'available', image: 'https://picsum.photos/seed/room101/1200/800', images: ['https://picsum.photos/seed/room101-1/1600/1000','https://picsum.photos/seed/room101-2/1600/1000','https://picsum.photos/seed/room101-3/1600/1000'] },
    { roomNumber: 102, type: 'Double', price: 5500, status: 'occupied', image: 'https://picsum.photos/seed/room102/1200/800', images: ['https://picsum.photos/seed/room102-1/1600/1000','https://picsum.photos/seed/room102-2/1600/1000','https://picsum.photos/seed/room102-3/1600/1000'] },
    { roomNumber: 103, type: 'Double', price: 5500, status: 'available', image: 'https://picsum.photos/seed/room103/1200/800', images: ['https://picsum.photos/seed/room103-1/1600/1000','https://picsum.photos/seed/room103-2/1600/1000','https://picsum.photos/seed/room103-3/1600/1000'] },
    { roomNumber: 104, type: 'Single', price: 3200, status: 'available', image: 'https://picsum.photos/seed/room104/1200/800', images: ['https://picsum.photos/seed/room104-1/1600/1000','https://picsum.photos/seed/room104-2/1600/1000','https://picsum.photos/seed/room104-3/1600/1000'] },
    { roomNumber: 105, type: 'Suite', price: 15000, status: 'available', image: 'https://picsum.photos/seed/room105/1200/800', images: ['https://picsum.photos/seed/room105-1/1600/1000','https://picsum.photos/seed/room105-2/1600/1000','https://picsum.photos/seed/room105-3/1600/1000'] },
    { roomNumber: 106, type: 'Suite', price: 14000, status: 'occupied', image: 'https://picsum.photos/seed/room106/1200/800', images: ['https://picsum.photos/seed/room106-1/1600/1000','https://picsum.photos/seed/room106-2/1600/1000','https://picsum.photos/seed/room106-3/1600/1000'] },
    { roomNumber: 201, type: 'Suite', price: 12000, status: 'available', image: 'https://picsum.photos/seed/room201/1200/800', images: ['https://picsum.photos/seed/room201-1/1600/1000','https://picsum.photos/seed/room201-2/1600/1000','https://picsum.photos/seed/room201-3/1600/1000'] },
    { roomNumber: 202, type: 'Double', price: 6000, status: 'available', image: 'https://picsum.photos/seed/room202/1200/800', images: ['https://picsum.photos/seed/room202-1/1600/1000','https://picsum.photos/seed/room202-2/1600/1000','https://picsum.photos/seed/room202-3/1600/1000'] },
    { roomNumber: 203, type: 'Single', price: 2800, status: 'available', image: 'https://picsum.photos/seed/room203/1200/800', images: ['https://picsum.photos/seed/room203-1/1600/1000','https://picsum.photos/seed/room203-2/1600/1000','https://picsum.photos/seed/room203-3/1600/1000'] },
    { roomNumber: 301, type: 'Deluxe', price: 20000, status: 'available', image: 'https://picsum.photos/seed/room301/1200/800', images: ['https://picsum.photos/seed/room301-1/1600/1000','https://picsum.photos/seed/room301-2/1600/1000','https://picsum.photos/seed/room301-3/1600/1000'] }
  ];

  for (const r of rooms) {
    const found = await Room.findOne({ roomNumber: r.roomNumber });
    if (!found) await Room.create(r);
    else {
      let changed = false;
      if (!found.image) { found.image = r.image; changed = true; }
      if (!found.images || found.images.length === 0) { found.images = r.images; changed = true; }
      if (changed) await found.save();
    }
  }
  console.log('Rooms seeded');

  // Bookings: seed several sample bookings if not present
  const sampleBookings = [
    { guest: 'Alice', room: 101, from: new Date('2025-12-20'), to: new Date('2025-12-22'), total: 'PKR 6,000' },
    { guest: 'Bob', room: 103, from: new Date('2025-12-25'), to: new Date('2025-12-28'), total: 'PKR 16,500' },
    { guest: 'Charlie', room: 201, from: new Date('2025-11-30'), to: new Date('2025-12-03'), total: 'PKR 24,000' },
    { guest: 'Diana', room: 106, from: new Date('2025-12-23'), to: new Date('2025-12-26'), total: 'PKR 42,000' },
    { guest: 'Eve', room: 301, from: new Date('2026-01-05'), to: new Date('2026-01-10'), total: 'PKR 100,000' },
    { guest: 'Frank', room: 202, from: new Date('2025-12-18'), to: new Date('2025-12-19'), total: 'PKR 6,000' },
    { guest: 'Grace', room: 103, from: new Date('2025-12-29'), to: new Date('2026-01-02'), total: 'PKR 22,000' },
    { guest: 'Hank', room: 105, from: new Date('2025-12-15'), to: new Date('2025-12-18'), total: 'PKR 45,000' },
    { guest: 'Irene', room: 104, from: new Date('2026-01-12'), to: new Date('2026-01-15'), total: 'PKR 9,600' },
    { guest: 'John', room: 203, from: new Date('2026-02-01'), to: new Date('2026-02-05'), total: 'PKR 11,200' },
    { guest: 'Kate', room: 101, from: new Date('2026-02-10'), to: new Date('2026-02-12'), total: 'PKR 6,000' },
    { guest: 'Luke', room: 301, from: new Date('2026-03-01'), to: new Date('2026-03-05'), total: 'PKR 80,000' },
    { guest: 'Maria', room: 202, from: new Date('2025-12-27'), to: new Date('2025-12-30'), total: 'PKR 18,000' }
  ];

  const existingCount = await Booking.countDocuments();
  if (existingCount < sampleBookings.length) {
    for (const b of sampleBookings) {
      const exists = await Booking.findOne({ guest: b.guest, room: b.room, from: b.from });
      if (!exists) await Booking.create(b);
    }
    console.log('Bookings seeded/updated');
  } else {
    console.log('Bookings already present');
  }

  mongoose.disconnect();
  console.log('Done');
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});