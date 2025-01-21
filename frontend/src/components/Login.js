import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', { username, password });
      localStorage.setItem('token', res.data.token); 
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, p: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#fff' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#7A4BFF', textAlign: 'center', fontWeight: 600 }}>
        Login
      </Typography>
      
      <form onSubmit={handleLogin}>
        {/* Username */}
        <TextField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        {/* Password */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          required
        />

        {error && <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>}

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, backgroundColor: '#7A4BFF' }}>
          Login
        </Button>
      </form>

      {/* Link to Register */}
      <Typography sx={{ mt: 2, textAlign: 'center' }}>
        Don't have an account?{' '}
        <MuiLink component={Link} to="/register" sx={{ color: '#7A4BFF', fontWeight: 600 }}>
          Register here
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Login;
