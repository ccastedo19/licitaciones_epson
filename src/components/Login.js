// src/components/Login.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  useMediaQuery
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
        setSnackbarMessage('Por favor, completa todos los campos.');
        setOpenSnackbar(true);
        return;
    }

    if (!isValidEmail(email)) {
        setSnackbarMessage('El correo no es válido.');
        setOpenSnackbar(true);
        return;
    }

    console.log('Email:', email, 'Password:', password);
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : 400,
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Iniciar sesión
        </Typography>

        <TextField
          fullWidth
          label="Correo electrónico"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2,
            "& input":{
                letterSpacing:'0.5px',
            }
           }}
        />

        <TextField
          fullWidth
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3,
            "& input":{
                letterSpacing:'0.5px',
            }
           }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ fontWeight:'bold' }}
        >
          Ingresar
        </Button>
      </Box>

        <Snackbar
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
            <Alert severity="warning" onClose={() => setOpenSnackbar(false)}>
                {snackbarMessage}
            </Alert>
        </Snackbar>

    </Box>
  );
};
