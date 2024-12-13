import React from 'react';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';

const HomeButton = () => {
  const router = useRouter();
  const { mode, toggleColorMode } = useTheme();

  return (
    <IconButton
      onClick={() => router.push('/')}
      sx={(theme) => ({
        position: 'fixed',
        bottom: 0,
        mb: 2,
        left: '50%',
        transform: 'translate(-50%)',
        zIndex: 1000,
        color:
                theme.palette.mode === 'light'
                  ? '#000'
                  : '#fff',
        bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.9)'
                  : theme.palette.primary.main,
        backgroundImage:
                theme.palette.mode === 'light'
                  ? ''
                  : `linear-gradient(to bottom,  #F5A14D,
                  , #DE740B})`,
      })}
    >
      <HomeIcon fontSize="large" />
    </IconButton>
  );
};

export default HomeButton;
