'use client';

import React, { useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const VerifyRequestPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.emailVerified) {
      router.push('/'); // Redirect to homepage if email is verified
    }
  }, [session, router]);

  const handleOpenEmailApp = () => {
    window.open('https://mail.google.com/', '_blank');
  };

  return (
    <Container sx={{ display: 'flex', height: '100vh', textAlign: 'center', justifyContent: 'center', alignItems: "center", flexDirection: 'column' }}>
      <Box sx={{ width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', position: 'relative', my: 1 }}>
        <Image loader={imageKitLoader} src={theme.palette.mode === 'light' ? '/logos/logolight' : '/logos/logodark'} alt='TechKshetra logo' layout='fill' objectFit='cover' />
      </Box>
      <Box>
        <Typography component='h1' variant='h2'>Check your email</Typography>
        <Typography component='h2' variant='subtitle1'>
          We have sent you a verification link to your email. Please follow the instructions to verify your email address.
        </Typography>
        <Button 
          variant="contained"
          color="primary"
          startIcon={<MailOutlineIcon />}
          onClick={handleOpenEmailApp}
          sx={{ mt: 2 }}
        >
          Open Email App
        </Button>
      </Box>
    </Container>
  );
};

export default VerifyRequestPage;
