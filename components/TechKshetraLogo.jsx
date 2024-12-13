'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// Importing the ImageKit loader
import imageKitLoader from '@/libs/imagekitloader'; // Adjust the path if needed

// LogoMesh component that uses R3F hooks
const LogoMesh = () => {
  const logoRef = useRef();

  const texture = useTexture(
    imageKitLoader({
      src: '/logos/logodark', // ImageKit path for the logo
      width: 500,
      quality: 90,
    })
  );

  // Animate the logo with continuous rotation, scaling, and pulsing
  useFrame(({ mouse, clock }) => {
    if (logoRef.current) {
      const time = clock.getElapsedTime();

      // Mouse interaction for rotation
      const xRotation = (mouse.y - 0.5) * Math.PI * 0.1;
      const yRotation = (mouse.x - 0.5) * Math.PI * 0.1;
      logoRef.current.rotation.x = xRotation;
      logoRef.current.rotation.y = yRotation;

      // Continuous rotation
      logoRef.current.rotation.z = time * 0.2;

      // Scaling for a pulsing effect
      const scale = 1 + 0.1 * Math.sin(time * 3);
      logoRef.current.scale.set(scale, scale, scale);

      // Small movement on the Y-axis for floating effect
      logoRef.current.position.y = Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <mesh ref={logoRef}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

const TechKshetraLogo = () => {
  const theme = useTheme(); // Access the Material-UI theme

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: "#dcdcdc",
        overflow: 'hidden',
        zIndex: -1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Canvas>
        <LogoMesh />
      </Canvas>
    </Box>
  );
};

export default TechKshetraLogo;
