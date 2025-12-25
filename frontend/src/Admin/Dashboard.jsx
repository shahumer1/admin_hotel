// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import { rooms, bookings } from '../data/sampleData';

// function Dashboard() {
//   const totalRooms = rooms.length;
//   const occupied = rooms.filter(r => r.status === 'Occupied').length;
//   const available = totalRooms - occupied;
//   const totalBookings = bookings.length;

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ mb: 3 }}>Dashboard</Typography>

//       <Grid container spacing={3} sx={{ mb: 3 }}>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Total Rooms</Typography>
//             <Typography variant="h5" sx={{ mt: 1 }}>{totalRooms}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Occupied</Typography>
//             <Typography variant="h5" sx={{ mt: 1 }}>{occupied}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Available</Typography>
//             <Typography variant="h5" sx={{ mt: 1 }}>{available}</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle2" color="text.secondary">Bookings</Typography>
//             <Typography variant="h5" sx={{ mt: 1 }}>{totalBookings}</Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       <Typography variant="h6" sx={{ mb: 1 }}>Recent Bookings</Typography>
//       <Paper>
//         <List>
//           {bookings.map(b => (
//             <div key={b.id}>
//               <ListItem>
//                 <ListItemText primary={`${b.guest} — Room ${b.room}`} secondary={`${b.from} → ${b.to} • ${b.total}`} />
//               </ListItem>
//               <Divider />
//             </div>
//           ))}
//         </List>
//       </Paper>
//     </Box>
//   );
// }

// export default Dashboard; 

import { useEffect, useState } from 'react';
import { rooms as roomsAPI, bookings as bookingsAPI } from '../services/api';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const roomsData = await roomsAPI.list();
        const bookingsData = await bookingsAPI.list();
        setRooms(roomsData);
        setBookings(bookingsData);
      } catch (err) {
        console.error('Error fetching data', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  const totalRooms = rooms.length;
  const occupied = rooms.filter(r => r.status.toLowerCase() === 'occupied').length;
  const available = totalRooms - occupied;
  const totalBookings = bookings.length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Dashboard</Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[ 
          { label: 'Total Rooms', value: totalRooms },
          { label: 'Occupied', value: occupied },
          { label: 'Available', value: available },
          { label: 'Bookings', value: totalBookings }
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
              <Typography variant="subtitle2" color="text.secondary">{stat.label}</Typography>
              <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>{stat.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>Recent Bookings</Typography>
      <Paper sx={{ p: 2, borderRadius: 2 }}>
        <List>
          {bookings.map((b, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={`${b.guest} — Room ${b.room}`}
                  secondary={`${new Date(b.from).toLocaleDateString()} → ${new Date(b.to).toLocaleDateString()} • ${b.total}`}
                />
              </ListItem>
              {index < bookings.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default Dashboard;
