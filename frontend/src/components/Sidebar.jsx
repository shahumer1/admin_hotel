import { NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import BookIcon from "@mui/icons-material/Book";
import Box from "@mui/material/Box";

const drawerWidth = 220;

function Sidebar({ mobileOpen, onClose }) {
  const items = [
    { to: "/admin", label: "Dashboard", icon: <DashboardIcon /> },
    { to: "/admin/users", label: "Users", icon: <PersonIcon /> },
    { to: "/admin/rooms", label: "Rooms", icon: <HotelIcon /> },
    { to: "/admin/bookings", label: "Bookings", icon: <BookIcon /> },
    { to: "/admin/calendar", label: "Calendar", icon: <BookIcon /> },
  ];

  return (
    <>
      <Drawer
        role="navigation"
        aria-label="Main navigation"
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'primary.main', color: '#fff' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Hotel Admin</Typography>
        </Box>

        <List>
          {items.map(item => (
            <ListItem key={item.to} disablePadding>
              <NavLink to={item.to} aria-label={item.label} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton sx={{ pl: 3 }}>
                  <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Drawer
        role="navigation"
        aria-label="Mobile navigation"
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: 'primary.main', color: '#fff' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ color: '#fff' }}>Hotel Admin</Typography>
        </Box>

        <List>
          {items.map(item => (
            <ListItem key={item.to} disablePadding>
              <NavLink to={item.to} aria-label={item.label} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton sx={{ pl: 3 }} onClick={onClose}>
                  <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Sidebar; 
