'use client'

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const PreloaderContainer = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  width: 'calc(100% - 32px)',
  height: 'calc(100vh - 32px)',
  top: '16px',
  left: '16px',
  background: 'white',
  zIndex: 9999,
  overflow: 'hidden',
  borderRadius: '18px',
  boxSizing: 'border-box',
}));

const FillAnimation = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  bottom: 0,
  background: theme.palette.primary.light,
  zIndex: 1,
  borderRadius: '18px',
}));

const TextContainer = styled(motion.div)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
});

const Text = styled(motion.div)(({ theme }) => ({
  ...theme.typography.h1,
  marginBottom: '20px',
  position: 'relative',
  display: 'inline-block',
  color: 'white',
}));

const LoadingLine = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  bottom: '-10px',
  left: 0,
  height: '3px',
  background: 'white',
  width: '100%',
}));

const Preloader = ({ onLoaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoaded();
    }, 5500);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <PreloaderContainer
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, height: '64px' }}
      transition={{ opacity: { duration: 1.5, ease: 'easeOut', delay: 4.5 }, height: { duration: 1.5, ease: 'easeOut', delay: 3.5 } }}
    >
      <FillAnimation
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <TextContainer>
        <Text
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2] }}
          transition={{ duration: 3, times: [0, 0.8, 1], ease: 'easeOut', delay: 0.4 }}
        >
          TechKshetra
          <LoadingLine
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 1 }}
          />
        </Text>
      </TextContainer>
    </PreloaderContainer>
  );
};

export default Preloader;
