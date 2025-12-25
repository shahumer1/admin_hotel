import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const drawerWidth = 220;

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(open => !open);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box component="main" sx={{ flex: 1, ml: { sm: `${drawerWidth}px` } }}>
        <Navbar onMenuClick={handleDrawerToggle} />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default AdminLayout;
