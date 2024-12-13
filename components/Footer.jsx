import imageKitLoader from '@/libs/imagekitloader';
import { Box, Stack, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useTheme } from '@/context/ThemeContext';

const logoStyle = {
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function Footer() {

  const {mode, toggleColorMode} = useTheme()

  return (
    <Box
      id='footer'
      borderRadius={'18px'}
      sx={(theme) => ({
        px: { xs: 2, sm: 8, md: 12 },
        backgroundColor: 
          theme.palette.mode === 'light'
          ? theme.palette.primary.light
          : theme.palette.secondary.light,
        py: { xs: 2, sm: 4, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        m: 2
      })}
    >
      <Stack direction={'row'} spacing={{ xs: 1, md: 2 }} sx={{ alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            width: { xs: '40px', sm: '60px', md: '100px' },
            height: '100%',
            borderRadius: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            loader={imageKitLoader}
            src={ mode === 'light' ? '/logos/logolight' : '/logos/logodark' }
            width={50}
            height={50}
            style={logoStyle}
            alt="TechKshetra Logo"
          />
        </Box>
        <Typography variant='h3'>
          TechKshetra
        </Typography>
      </Stack>
      <Stack direction='row' spacing={2} mb={2}>
        <IconButton
          component="a"
          href="https://www.instagram.com/techkshetra.birla?igsh=MWVwNTAyaXB1dzFrZg=="
          rel="noopener noreferrer"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          })}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:techkshetra.cs.it.club@gmail.com" // Replace with your email address
          target="_blank"
          rel="noopener noreferrer"
          sx={(theme) => ({
            color: theme.palette.text.primary,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          })}
        >
          <EmailIcon />
        </IconButton>
      </Stack>
    </Box>
  );
}

export default Footer;
