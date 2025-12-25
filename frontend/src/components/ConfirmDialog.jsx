import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ConfirmDialog({ open, title = 'Confirm', message = 'Are you sure?', onCancel, onConfirm }) {
  return (
    <Dialog open={open} onClose={onCancel} aria-label="confirmation dialog">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}