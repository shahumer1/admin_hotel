import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { auth } from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     navigate('/admin');
  //   }
  // }, [navigate]);
useEffect(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (isLoggedIn) {
    navigate('/admin', { replace: true });
  }
}, [navigate]);



  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setError(null);
  //     const res = await auth.login(email, password);
  //     if (res && res.token) {
  //       navigate('/admin');
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Login failed');
  //   }
  // };
  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await auth.login(email, password);
    if (res && res.token) {
      // Save token & isLoggedIn
      localStorage.setItem('token', res.token);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/admin', { replace: true });
    }
  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};


  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 12, p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>Admin Login</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleLogin} sx={{ display: 'grid', gap: 2 }}>
          <TextField label="Email" required fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" type="password" required fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
  