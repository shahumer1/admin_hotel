import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

export default function RoomCard({ room, onView, onDelete, onEdit }) {
  return (
    <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }} aria-label={`Room ${room.id}`}>
      {room.image ? (
        <CardMedia
          component="img"
          height="140"
          image={room.image}
          alt={`Room ${room.id}`}
        />
      ) : (
        <CardMedia
          component="div"
          sx={{ height: 140, background: 'linear-gradient(135deg,#e0f2f1,#b2dfdb)' }}
          title={`Room ${room.id}`}
        />
      )}

      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography gutterBottom variant="h6" component="div">
            Room {room.id}
          </Typography>
          <Chip label={String(room.status).charAt(0).toUpperCase() + String(room.status).slice(1)} color={String(room.status).toLowerCase() === 'available' ? 'success' : 'default'} size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary">
          Type: {room.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: PKR {room.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={() => onView(room)}>View</Button>
        <IconButton size="small" aria-label="edit" onClick={() => onEdit(room)}>
          <EditIcon />
        </IconButton>
        <Box sx={{ flex: 1 }} />
        <Button size="small" color="error" onClick={() => onDelete(room.id)}>Delete</Button>
      </CardActions>
    </Card>
  );
}
