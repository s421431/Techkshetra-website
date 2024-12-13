'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image'; 
import imageKitLoader from '@/libs/imagekitloader'; 
import { Container, Typography, Box, Button, Stack } from '@mui/material';
import { useTheme } from '@/context/ThemeContext';
import HomeButton from '@/components/HomeButton';
import '@/style/highlights.css';
import highlights from '@/data/highlights';

const HighlightsPage = () => {
  const { mode, toggleColorMode } = useTheme(); 

  // Collect all images into a single array
  const allImages = highlights.flatMap(highlight => highlight.images);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState(highlights[0].title);
  const [selectedImage, setSelectedImage] = useState(null);

  // Debounced interval for smoother image transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval);
  }, [allImages.length]);

  const variants = {
    enter: {
      opacity: 0,
      x: 1000,
    },
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      x: -1000,
      transition: {
        duration: 1,
      },
    },
  };

  const galleryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        textAlign: "center",
        pb: 10, // Add padding-bottom to make space for the tab component
      }}
    >
      <Typography variant="h1" gutterBottom sx={{ my: { xs: 4, sm: 8 } }}>
        Highlights
      </Typography>

      {/* Slideshow */}
      <Box
        my={{ xs: 4, sm: 8 }}
        sx={{
          position: 'relative',
          width: '100%',
          height: '600px',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000',
              overflow: 'hidden',
            }}
          >
            <Image
              loader={imageKitLoader}
              src={allImages[currentImageIndex]}
              alt="Slideshow"
              layout="fill"
              objectFit="cover"
              priority={currentImageIndex === 0}  // Priority only for the first image
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZT4udHdpc3RlZCB7IGZpbGw6I0Y3QjQ3MTsgc3Ryb2tlOm5vbmU7IHN0cm9rZS13aWR0aDoycHg7IHN0cm9rZS1saW5lY2FwOiJyb3VuZCI7IHN0cm9rZS1kYXRhOiJ1cmwoIzAwMDAsIj4iLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiLz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJsaWdodGJsdWU7Ii8+PHJlY3QgeD0iNDAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJsaWdodGJsZXU7Ii8+PC9zdHlsZT4KPC9zdmc+Cg=="
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"  // Responsive image sizes
              loading={currentImageIndex === 0 ? "eager" : "lazy"}  // Lazy loading for non-first images
            />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Section Navigation Buttons */}
      <Stack direction="row" gap={2} flexWrap={'wrap'} justifyContent="center" sx={{ mt: {xs: 4, sm: 10} }}>
        {highlights.map((highlight, index) => (
          <Button
            key={index}
            variant={highlight.title === activeSection ? "contained" : "outlined"}
            onClick={() => setActiveSection(highlight.title)}
          >
            {highlight.title}
          </Button>
        ))}
      </Stack>

      {/* Highlights Gallery */}
      {highlights.map((highlight, index) => (
        highlight.title === activeSection && (
          <Box key={index} my={{ xs: 4, sm: 6 }} id={highlight.title}>
            <Typography variant="h4" gutterBottom>
              {highlight.title}
            </Typography>
            <div className="gallery-grid">
              <AnimatePresence>
                {highlight.images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    custom={imgIndex}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={galleryVariants}
                    className={`gallery-item ${selectedImage === image ? 'selected' : ''}`}
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      loader={imageKitLoader}
                      src={image}
                      alt={`${highlight.title} Image ${imgIndex + 1}`}
                      width={600}
                      height={400}
                      style={{ objectFit: 'cover' }}
                      priority={imgIndex === 0}  // Prioritize the first image
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Box>
        )
      ))}

      {/* Image Overlay */}
      {selectedImage && (
        <div className="overlay" onClick={handleCloseImage}>
          <div className="enlarged-image">
            <Image
              loader={imageKitLoader}
              src={selectedImage}
              alt="Enlarged"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <HomeButton />
    </Container>
  );
};

export default HighlightsPage;
