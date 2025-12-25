export const users = [
  { id: 1, name: "Admin", role: "Admin", email: "admin@hotel.com" },
  { id: 2, name: "Ali", role: "Receptionist", email: "ali@hotel.com" },
  { id: 3, name: "Sara", role: "Housekeeping", email: "sara@hotel.com" }
];

export const rooms = [
  { id: 101, type: "Single", status: "Available", price: 3000 },
  { id: 102, type: "Double", status: "Occupied", price: 5500 },
  { id: 201, type: "Suite", status: "Available", price: 12000 }
];

export const bookings = [
  { id: 1, guest: "John Doe", room: 102, from: "2025-12-20", to: "2025-12-23", total: "PKR 16,500" },
  { id: 2, guest: "Jane Smith", room: 201, from: "2025-12-21", to: "2025-12-22", total: "PKR 12,000" }
];