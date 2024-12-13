'use client';

import { useState } from 'react';
import { TextField, Button, Typography, Box, Container, useTheme } from '@mui/material';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import HomeButton from '@/components/HomeButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleForgotPassword = async () => {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(response.ok ? 'Password reset email sent' : data.message || 'Failed to send password reset email');
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: 
            theme.palette.mode === 'light'
            ? '#F7B471'
            : '#0A66C2',
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper,
            padding: { xs: theme.spacing(2), sm: theme.spacing(3) },
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%',
            position: 'relative',
          }}
        >
          <Box sx={{ width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 1 }}>
            <Image loader={imageKitLoader} src={theme.palette.mode === 'light' ? '/logos/logolight' : '/logos/logodark'} alt='TechKshetra logo' layout='fill' objectFit='cover' />
          </Box>

          <Typography component="h1" variant="h2">
            Forgot Password
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleForgotPassword}
            sx={{ mt: 3, mb: 2 }}
          >
            Send Reset Email
          </Button>

          {message && (
            <Typography color="info" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
        <HomeButton />
      </Container>
    </Box>
  );
};

export default ForgotPassword;
