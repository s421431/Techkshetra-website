'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession, signOut } from 'next-auth/react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import imageKitLoader from '@/libs/imagekitloader';
import { motion } from 'framer-motion';
import { Divider, Link } from '@mui/material';

const logoStyle = {
  width: '55px',
  height: 'auto',
  cursor: 'pointer',
  display: 'block',
};

function AppAppBar() {
  const { mode, toggleColorMode } = useTheme();
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (prevScrollPos > currentScrollPos) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div>
      <AppBar
        sx={(theme) => ({
          position: 'fixed',
          left: 0,
          top: 0,
          padding: 0,
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          width: 'calc(100% - 32px)',
          borderColor: 'divider',
        })}
      >
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            px: 2,
            gap: 25,
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '18px',
            maxHeight: 60,
          })}
        >
          <Box>
            <Link href='/'>
                <Image
                  src={mode === 'light' ? '/logos/logolight' : '/logos/logodark'}
                  loader={imageKitLoader}
                  width={100}
                  height={100}
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Link>
          </Box>
          <Box
            sx={{
              flexGrow: 2,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: "space-between" } }}>
              <MenuItem onClick={() => router.push('/')} sx={{ py: '6px', px: '12px' }}>
                <Typography variant="body2" color="text.primary">
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => router.push('/events')} sx={{ py: '6px', px: '12px' }}>
                <Typography variant="body2" color="text.primary">
                  Events
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => router.push('/highlights')} sx={{ py: '6px', px: '12px' }}>
                <Typography variant="body2" color="text.primary">
                  Highlights
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => router.push('/courses')} sx={{ py: '6px', px: '12px' }}>
                <Typography variant="body2" color="text.primary">
                  Courses
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => router.push('/aboutus')} sx={{ py: '6px', px: '12px' }}>
                <Typography variant="body2" color="text.primary">
                  About Us
                </Typography>
              </MenuItem>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            {status === 'authenticated' ? (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/profile"
                  target="_self"
                >
                  Profile
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/auth/signin"
                  target="_self"
                >
                  Sign In
                </Button>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  href="/auth/signup"
                  target="_self"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ display: { sm: '', md: 'none' } }}>
            <Button
              variant="text"
              color="primary"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ minWidth: '30px', p: '4px' }}
            >
              <MenuIcon />
            </Button>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                component: motion.div,
                initial: { height: 0 },
                animate: { height: open ? '100vh' : 0 },
                transition: { duration: 1.2 },
              }}
              sx={{
                '& .MuiDrawer-paper': {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 2,
                  bgcolor: 'primary.light', // Set background color
                  overflowY: 'hidden',
                  color: 'white', // Set text color
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="text"
                  onClick={toggleDrawer(false)}
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1300, // Ensure button is above other content
                    color: 'white', // Set button color
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Ripple effect color
                    }
                  }}
                >
                  <CloseIcon />
                </Button>
                {['Home', 'Events', 'Highlights', 'Courses', 'About Us'].map((text, index) => {
                  const path = text === 'Home' ? '/' : `/${text.toLowerCase().replace(' ', '')}`;
                  return (
                    <motion.div
                      key={text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    >
                      <MenuItem onClick={() => router.push(path)} sx={{ py: '12px', px: '24px', color: 'white' }}>
                        <Typography variant="h6" color="inherit">
                          {text}
                        </Typography>
                      </MenuItem>
                    </motion.div>
                  );
                })}
                <Divider sx={{ my: 2, borderColor: 'white' }} />
                {status === 'authenticated' ? (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="text"
                        component="a"
                        href="/profile"
                        target="_self"
                        sx={{ width: '100%', color: 'white', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } }}
                      >
                        Profile
                      </Button>
                    </MenuItem>
                    <MenuItem sx={{'&:hover': {backgroundColor: 'transparent'}}}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => signOut()}
                        sx={{ width: '100%', color: 'white', '&:hover': { backgroundColor: 'transparent'}}}
                      >
                        Sign out
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem sx={{'&:hover': {backgroundColor: 'transparent'}}}>
                      <Button
                        color="primary"
                        variant="outlined"
                        href="/auth/signin"
                        sx={{ width: '100%', color: 'white', }}
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                    <MenuItem sx={{'&:hover': {backgroundColor: 'transparent'}}}>
                      <Button
                        color="primary"
                        variant="contained"
                        href="/auth/signup"
                        sx={{ width: '100%', color: 'white', '&:hover': { backgroundColor: 'transparent' } }}
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  window: PropTypes.func,
};

export default AppAppBar;
