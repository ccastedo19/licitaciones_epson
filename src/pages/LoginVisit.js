// src/pages/LoginVisit.js
import React, { useState } from 'react';
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Box, Typography, Button } from '@mui/material';

export const LoginVisit = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Box>
      {isRegistering ? (
        <>
          <Register />
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              ¿Ya tienes cuenta?
              <Button variant="text" onClick={() => setIsRegistering(false)}>
                Inicia sesión
              </Button>
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Login />
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              ¿No tienes cuenta?
              <Button variant="text" onClick={() => setIsRegistering(true)}>
                Regístrate
              </Button>
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};
