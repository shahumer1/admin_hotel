import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { bookings as initialBookings } from '../data/sampleData';

function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);

  const handleDelete = (id) => setBookings(prev => prev.filter(b => b.id !== id));

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Bookings</Typography>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map(b => (
              <TableRow key={b.id}>
                <TableCell>{b.guest}</TableCell>
                <TableCell>{b.room}</TableCell>
                <TableCell>{b.from}</TableCell>
                <TableCell>{b.to}</TableCell>
                <TableCell>{b.total}</TableCell>
                <TableCell>
                  <Button size="small" color="error" onClick={() => handleDelete(b.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Bookings; 
