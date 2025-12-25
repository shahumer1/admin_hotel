import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BookingDialog from './BookingDialog';
import { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import { upload as uploadAPI, rooms as roomsAPI } from '../services/api';

export default function RoomDetailsDialog({ open, onClose, room, onBooked, onUpdated }) {
  const [openBook, setOpenBook] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  if (!room) return null;

  const images = room.images && room.images.length ? room.images : (room.image ? [room.image] : []);

  const handleChooseFiles = () => {
    fileRef.current && fileRef.current.click();
  };

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = [];
      for (const f of files) {
        const res = await uploadAPI.file(f);
        urls.push(res.url || res.path || res.url || '');
      }
      // append to existing images
      const updated = [...images, ...urls];
      await roomsAPI.update(room._id || room.id, { images: updated, image: updated[0] || room.image });
      // call parent to refresh data
      onUpdated && onUpdated();
    } catch (err) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = null;
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} aria-label={`Details for room ${room.id}`}>
        <DialogTitle>Room {room.id} Details</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gap: 1, minWidth: 320 }}>
            <Box sx={{ mb: 1 }}>
              {images && images.length ? (
                <Box component="img" src={images[0]} alt={`Room ${room.id}`} sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 1 }} />
              ) : (
                <Box sx={{ width: '100%', height: 300, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                  <ImageIcon sx={{ fontSize: 64, color: 'text.secondary' }} />
                </Box>
              )}

              {/* thumbnails */}
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {images.map((src, i) => (
                  <Grid item key={i}>
                    <Box component="img" src={src} alt={`thumb-${i}`} sx={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 1, border: '1px solid #eee' }} />
                  </Grid>
                ))}
              </Grid>

              <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />
              <Box sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'center' }}>
                <Button variant="outlined" startIcon={<UploadIcon />} onClick={handleChooseFiles} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Images'}</Button>
                {uploading && <CircularProgress size={20} />}
              </Box>
            </Box>

            <Typography variant="subtitle2" color="text.secondary">Type</Typography>
            <Typography>{room.type}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Status</Typography>
            <Typography>{room.status}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Price</Typography>
            <Typography>PKR {room.price}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Description</Typography>
            <Typography color="text.secondary">A comfortable {room.type} room with modern amenities and friendly service.</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button variant="contained" onClick={() => setOpenBook(true)}>Book</Button>
        </DialogActions>
      </Dialog>

      <BookingDialog open={openBook} onClose={() => setOpenBook(false)} room={room} onBooked={() => { onBooked && onBooked(); }} />
    </>
  );
}
