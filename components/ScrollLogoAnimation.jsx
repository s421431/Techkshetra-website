import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';
import { useTheme } from '@mui/material/styles';

const ScrollLogoAnimation = ({ onAnimationComplete }) => {
  const scrollRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative'}}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: '-100%' }}
        transition={{ 
          duration: 1.3, // Increase duration if needed
          ease: [0.2, .22, .23, 1] // Custom cubic-bezier easing function
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.light : theme.palette.secondary.light,
          zIndex: 9999, 
        }}
        onAnimationComplete={onAnimationComplete} // Trigger the callback when animation completes
      >
      </motion.div>
    </div>
  );
};

export default ScrollLogoAnimation;
