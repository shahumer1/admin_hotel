import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./Admin/AdminLayout";
import Dashboard from "./Admin/Dashboard";
import Users from "./Admin/Users";
import Rooms from "./Admin/Rooms";
import Bookings from "./Admin/Bookings";
import CalendarPage from "./Admin/Calendar";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Protected admin routes */}
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
