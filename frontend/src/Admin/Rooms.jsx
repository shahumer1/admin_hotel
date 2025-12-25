import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import RoomCard from '../components/RoomCard';
import RoomDetailsDialog from '../components/RoomDetailsDialog';
import Button from '@mui/material/Button';
import AddEditRoomDialog from '../components/AddEditRoomDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { rooms as sampleRooms } from '../data/sampleData';
import { rooms as roomsAPI } from '../services/api';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [editRoom, setEditRoom] = useState(null);

  useEffect(() => {
    // fetch rooms from API, fallback to sample data on error
    const fetchRooms = async () => {
      try {
        const data = await roomsAPI.list();
        setRooms(data.map(r => ({ _id: r._id, id: r.roomNumber || r._id, roomNumber: r.roomNumber, type: r.type, price: r.price, status: r.status, image: r.image, images: r.images || [] })));
      } catch (err) {
        console.warn('Failed to load rooms from API, using sample data', err.message);
        setRooms(sampleRooms);
      }
    };
    fetchRooms();
  }, []);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const handleDelete = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    const id = toDeleteId;
    setConfirmOpen(false);
    setToDeleteId(null);
    try {
      await roomsAPI.remove(id);
      setRooms(prev => prev.filter(r => Number(r.id) !== Number(id)));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleView = (room) => { setSelected(room); setOpenDetails(true); };
  const handleCloseDetails = () => { setOpenDetails(false); setSelected(null); };

  const handleAddClick = () => { setEditRoom(null); setOpenAdd(true); };
  const handleEditClick = (room) => { setEditRoom(room); setOpenAdd(true); };

  const handleSaveRoom = async (room) => {
    try {
      const exists = rooms.find(r => Number(r.id) === Number(room.id));
      if (exists) {
        await roomsAPI.update(room.id, { roomNumber: room.id, type: room.type, price: room.price, status: room.status, image: room.image });
        setRooms(prev => prev.map(r => Number(r.id) === Number(room.id) ? { ...r, ...room } : r));
      } else {
        await roomsAPI.add({ roomNumber: room.id, type: room.type, price: room.price, status: room.status, image: room.image });
        setRooms(prev => [{ ...room }, ...prev]);
      }
    } catch (err) {
      alert('Save failed');
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Rooms</Typography>
        <Button variant="contained" onClick={handleAddClick}>Add Room</Button>
      </Box>

      <Grid container spacing={3}>
        {rooms.map(r => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <RoomCard room={r} onView={handleView} onDelete={handleDelete} onEdit={handleEditClick} />
          </Grid>
        ))}
      </Grid>

      <RoomDetailsDialog open={openDetails} onClose={handleCloseDetails} room={selected} onUpdated={async () => {
        // refresh rooms list after image upload
        try {
          const data = await roomsAPI.list();
          setRooms(data.map(r => ({ _id: r._id, id: r.roomNumber || r._id, roomNumber: r.roomNumber, type: r.type, price: r.price, status: r.status, image: r.image, images: r.images || [] })));
        } catch (err) {
          console.warn('Failed to refresh rooms', err.message);
        }
      }} />

      <AddEditRoomDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleSaveRoom}
        initial={editRoom}
      />

      {/* Confirmation dialog for deletes */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete room"
        message="Are you sure you want to delete this room?"
        onCancel={() => { setConfirmOpen(false); setToDeleteId(null); }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default Rooms; 
