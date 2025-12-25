import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddUserDialog({ open, onClose, onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Receptionist');

  const handleAdd = () => {
    if (!name || !email) return;
    onAdd({ id: Date.now(), name, email, role });
    setName(''); setEmail(''); setRole('Receptionist');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-label="Add user dialog">
      <DialogTitle>Add User</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2, width: 360, mt: 1 }}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField label="Role" value={role} onChange={e => setRole(e.target.value)} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
}