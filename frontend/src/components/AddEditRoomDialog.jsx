import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { upload } from '../services/api';

const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe'];
const statuses = ['available', 'occupied'];

export default function AddEditRoomDialog({ open, onClose, onSave, initial = null }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [type, setType] = useState('Single');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('available');
  const [image, setImage] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setRoomNumber(initial.id || initial.roomNumber || '');
      setType(initial.type || 'Single');
      setPrice(initial.price || '');
      setStatus(initial.status || 'available');
      setImage(initial.image || '');
      setErrors({});
    } else {
      setRoomNumber(''); setType('Single'); setPrice(''); setStatus('available'); setImage(''); setFile(null); setErrors({});
    }
  }, [initial, open]);

  const validate = () => {
    const e = {};
    if (!roomNumber) e.roomNumber = 'Room number is required';
    else if (isNaN(Number(roomNumber))) e.roomNumber = 'Must be a number';
    if (!type) e.type = 'Type is required';
    if (!price) e.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) e.price = 'Must be a positive number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const room = {
      id: Number(roomNumber),
      type,
      price: Number(price),
      status,
      image: image || undefined
    };
    onSave(room);
    onClose();
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true);
      const res = await upload.file(file);
      setImage(res.url || res.path || '');
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-label="Add or edit room">
      <DialogTitle>{initial ? 'Edit Room' : 'Add Room'}</DialogTitle>
      <DialogContent sx={{ minWidth: 380, pt: 1 }}>
        <Box sx={{ display: 'grid', gap: 2 }}>
          <TextField
            label="Room Number"
            value={roomNumber}
            onChange={e => setRoomNumber(e.target.value)}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber}
            fullWidth
          />

          <TextField
            select
            label="Type"
            value={type}
            onChange={e => setType(e.target.value)}
            error={!!errors.type}
            helperText={errors.type}
            fullWidth
          >
            {roomTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>

          <TextField
            label="Price (PKR)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            error={!!errors.price}
            helperText={errors.price}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            fullWidth
          >
            {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </TextField>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={!file || uploading}>{uploading ? 'Uploading...' : 'Upload Image'}</Button>

          <TextField
            label="Image URL (optional)"
            value={image}
            onChange={e => setImage(e.target.value)}
            fullWidth
          />

          {uploading && <LinearProgress />}

          {image && (
            <Box component="img" src={image} alt="preview" sx={{ width: '100%', borderRadius: 1, mt: 1 }} />
          )}

          {!image && (
            <Typography color="text.secondary" variant="body2">No image provided — card will use a default visual.</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>{initial ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
}