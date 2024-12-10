'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, MenuItem, Typography, Container, Snackbar, Alert, useTheme, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import HomeButton from '@/components/HomeButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'visitor',
    studentId: '',
  });
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to control loading loop visibility
  const router = useRouter();
  const theme = useTheme(); // Get current theme

  useEffect(() => {
    const { name, email, password, userType, studentId } = formData;
    const isFormComplete = name && email && password && userType && (userType !== 'student' || studentId);
    setIsButtonDisabled(!isFormComplete);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading loop

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setIsLoading(false); // Stop loading loop regardless of the result

    if (result.error) {
      if (result.error.includes('already exists')) {
        setError('User already exists with the same email. Redirecting to sign-in page...');
        setShowSnackbar(true);
        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000); // Redirect after 3 seconds to allow Snackbar message to be seen
      } else {
        setError(result.error);
        setShowSnackbar(true);
      }
    } else {
      router.push('/auth/verify-request');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
            : '#0A66C2', // Use theme background color
    }}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.paper, // Use theme paper color
            padding: { xs: theme.spacing(2), sm: theme.spacing(3) },
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
            width: '100%',
            position: 'relative', // Required for positioning Snackbar
          }}
        >
          <Box sx={{ width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 1 }}>
            <Image loader={imageKitLoader} src={theme.palette.mode === 'light' ? '/logos/logolight' : '/logos/logodark'} alt='TechKshetra logo' layout='fill' objectFit='cover' />
          </Box>

          <Typography component="h1" variant="h3">
            Sign Up
          </Typography>

          <TextField
            margin="normal"
            required
            fullWidth
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="userType"
            label="User Type"
            select
            value={formData.userType}
            onChange={handleChange}
          >
            <MenuItem value="visitor">Visitor</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </TextField>
          {formData.userType === 'student' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="studentId"
              label="Student ID"
              value={formData.studentId}
              onChange={handleChange}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          {showSnackbar && (
            <Snackbar
              open={showSnackbar}
              autoHideDuration={3000} // Duration for Snackbar to stay visible
              onClose={() => setShowSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={() => setShowSnackbar(false)} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
        </Box>
      </Container>
      
      {/* Full-Screen Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
            zIndex: 1300, // Ensure it is above other content
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="inherit" size={60} />
        </Box>
      )}

      <HomeButton />
    </Box>
  );
};

export default Signup;
