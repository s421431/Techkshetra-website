'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Typography, Container, Box, Snackbar, Alert, useTheme, InputAdornment, IconButton, SnackbarContent, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import HomeButton from '@/components/HomeButton';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [signupPrompt, setSignupPrompt] = useState(false); // State to handle signup prompt
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const { data: session, status } = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    setIsButtonDisabled(!(email && password));
  }, [email, password]);

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user.emailVerified) {
        router.push('/');
      } else {
        setError('Please verify your email before signing in.');
        setShowSnackbar(true);
      }
    }
  }, [status, session, router]);

  const handleSignIn = async () => {
    setIsLoading(true); // Start loading
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false); // Stop loading

    if (result.error) {
      if (result.error.includes('User does not exist')) {
        setSignupPrompt(true); // Trigger the signup prompt Snackbar
      } else if (result.error.includes('Invalid password')) {
        setError('Invalid email or password.');
        setShowSnackbar(true);
      } else if (result.error.includes('Email not verified')) {
        setError('Please verify your email before signing in.');
        setShowSnackbar(true);
      } else {
        setError('An unknown error occurred.');
        setShowSnackbar(true);
      }
    } else {
      router.push('/');
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
    setSignupPrompt(false);
  };

  const handleSignupRedirect = () => {
    router.push('/auth/signup');
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
      backgroundColor: theme.palette.mode === 'light' ? '#F7B471' : '#0A66C2',
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
            Sign in
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="subtitle2" sx={{textAlign: 'right', width: '100%', color: theme.palette.text.secondary}}>
              <Link href="/auth/forgot-password" style={{ color: theme.palette.text.secondary }}>Forgot Password?</Link>
          </Typography>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignIn}
            disabled={isButtonDisabled || isLoading} // Disable the button during loading
            sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} /> // Spinner
            ) : 'Sign in'}
          </Button>

          {showSnackbar && !signupPrompt && (
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleCloseSnackbar} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}

          {signupPrompt && (
            <Snackbar
              open={signupPrompt}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <SnackbarContent
                message="User does not exist. Do you want to sign up with this email?"
                action={
                  <>
                    <Button color="secondary" size="small" onClick={handleSignupRedirect}>
                      SIGN UP
                    </Button>
                    <Button color="primary" size="small" onClick={handleCloseSnackbar}>
                      Enter Correct Email
                    </Button>
                  </>
                }
              />
            </Snackbar>
          )}
        </Box>
        <HomeButton />
      </Container>
    </Box>
  );
};

export default SignIn;
