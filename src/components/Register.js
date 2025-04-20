// src/components/Register.js
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
  useMediaQuery,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Checkbox, FormControlLabel, Link } from '@mui/material';

export const Register = () => {
  const [userType, setUserType] = useState('empresa');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);



  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = () => {
    if (!name || !email || !phone || !password || !repeatPassword) {
      setSnackbarMessage('Por favor, completa todos los campos.');
      setOpenSnackbar(true);
      return;
    }

    if (!isValidEmail(email)) {
      setSnackbarMessage('El correo no es válido.');
      setOpenSnackbar(true);
      return;
    }

    if (password !== repeatPassword) {
      setSnackbarMessage('Las contraseñas no coinciden.');
      setOpenSnackbar(true);
      return;
    }

    if (isNaN(phone) || phone.length < 6) {
      setSnackbarMessage('Número de teléfono inválido.');
      setOpenSnackbar(true);
      return;
    }

    // Aquí podrías enviar los datos al backend
    console.log({ userType, name, email, phone, password });
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
          width: isMobile ? '100%' : 450,
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
    <Typography variant="h5" textAlign="center" mb={3}>
        Registro de cuenta
    </Typography>

    <TextField
        fullWidth
        label={userType === 'empresa' ? 'Nombre de empresa' : 'Nombre completo'}
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 2 }}
    />

    <Box
    sx={{
        display: 'flex',
        gap: 2,
        flexDirection: isMobile ? 'column' : 'row',
        mb: 2,
        alignItems: 'flex-end'
    }}
    >
    {/* --- Teléfono con etiqueta estilo MUI --- */}
    <FormControl sx={{ width:"50%"}}>
        <InputLabel
        shrink             
        sx={{ backgroundColor: '#fff', px: 0.5, top:'2px' }}  
        >
        Teléfono
        </InputLabel>

        <Box sx={{ paddingTop:'2px' }}>
        <PhoneInput
            country={'bo'}
            preferredCountries={['bo', 'ar', 'cl', 'co', 'us']}
            value={phone}
            onChange={setPhone}
            inputStyle={{
            width: '100%',
            height: 56,
            fontSize: '16px',
            paddingLeft: '48px',
            borderRadius: 4,
            border: '1px solid #c4c4c4',
            }}
            containerStyle={{ width: '100%' }}
            buttonStyle={{ border: 'none', background: 'transparent' }}
        />
        </Box>
    </FormControl>

    {/* --- Tipo de empresa --- */}
    <TextField
        select
        fullWidth
        label="Tipo de Empresa"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        sx={{
            width:"50%",
        '& .MuiSelect-select': { textAlign: 'left' },
        '& .MuiMenuItem-root': { justifyContent: 'flex-start' },
        }}
    >
        <MenuItem value="empresa">Empresa</MenuItem>
        <MenuItem value="persona">Unipersonal</MenuItem>
    </TextField>
    </Box>

    

    <TextField
        fullWidth
        label="Correo electrónico"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
    />

    <TextField
        fullWidth
        label="Contraseña"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
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

    <FormControlLabel
        control={
            <Checkbox
            checked={acceptedPolicy}
            onChange={(e) => setAcceptedPolicy(e.target.checked)}
            color="primary"
            />
        }
        label={
            <Typography variant="body2" style={{ textAlign:'left' }}>
            He leído las{' '}
            <Link
                href="#"
                underline="hover"
                sx={{ color: '#1976d2', fontWeight: 500 }}
                onClick={(e) => e.preventDefault()}
            >
                Políticas de Privacidad
            </Link>{' '}
            y estoy de acuerdo.
            </Typography>
        }
        sx={{ mb: 2 }}
    />


    <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleRegister}
        sx={{ fontWeight: 'bold' }}
        >
        Registrarse
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
