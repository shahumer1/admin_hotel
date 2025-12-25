# Backend for Hotel Management

This backend provides REST endpoints for managing users, rooms, bookings and auth for the admin panel.

## Quick start
1. Copy `.env.example` → `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install` (already added in repository).
3. Seed sample data: `node seed.js` (creates admin user, sample rooms/bookings).
4. Start server: `npm start` (defaults to `PORT` in env).

## Endpoints
- POST /api/auth/login { email, password } → { token }
- POST /api/auth/register { name, email, password, role } → register (seed or admin)

Users (admin only):
- GET /api/users
- POST /api/users/add
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

Rooms:
- GET /api/rooms (auth required)
- POST /api/rooms/add (admin)
- PUT /api/rooms/:id (admin)
- DELETE /api/rooms/:id (admin)

Bookings:
- POST /api/bookings (auth required)
- GET /api/bookings (admin)
- GET /api/bookings/:id (auth)
- DELETE /api/bookings/:id (admin)

Stats (admin):
- GET /api/stats → { users, rooms, bookings }

Include `Authorization: Bearer <token>` for protected routes.
