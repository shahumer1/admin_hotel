import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { bookings as bookingsAPI } from '../services/api';

export default function BookingDialog({ open, onClose, room, onBooked }) {
  const [guest, setGuest] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBook = async () => {
    setError(null);
    if (!guest || !from || !to) return setError('Fill all fields');
    try {
      setLoading(true);
      await bookingsAPI.create({ guest, room: room.id || room.id, from, to, total: 'TBD' });
      setLoading(false);
      onBooked && onBooked();
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-label="Create booking">
      <DialogTitle>Create Booking for Room {room?.id}</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, minWidth: 320 }}>
        <TextField label="Guest name" value={guest} onChange={e => setGuest(e.target.value)} fullWidth />
        <TextField label="From" type="date" value={from} onChange={e => setFrom(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField label="To" type="date" value={to} onChange={e => setTo(e.target.value)} InputLabelProps={{ shrink: true }} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleBook} disabled={loading}>{loading ? 'Booking...' : 'Book'}</Button>
      </DialogActions>
    </Dialog>
  );
}