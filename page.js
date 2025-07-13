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

  const slideshowVariants = {
    enter: { opacity: 0, x: 1000 },
    center: { opacity: 1, x: 0, transition: { duration: 1 } },
    exit: { opacity: 0, x: -1000, transition: { duration: 1 } },
  };

  const galleryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 }, // Faster delay for quicker population
    }),
  };
  
  // NEW: Variants for the entire section transition
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  // NEW: Variants for the collapsible description box
  const descriptionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
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
        pb: 10,
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
          height: { xs: '300px', sm: '450px', md: '600px' }, // Responsive height
          overflow: 'hidden',
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentImageIndex}
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideshowVariants}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              loader={imageKitLoader}
              src={allImages[currentImageIndex]}
              alt="Slideshow"
              fill
              style={{ objectFit: 'cover' }}
              priority={currentImageIndex === 0}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzdHlsZT4ucHdpc3RlZCB7IGZpbGw6I0Y3QjQ3MTsgc3Ryb2tlOm5vbmU7IHN0cm9rZS13aWR0aDoycHg7IHN0cm9rZS1saW5lY2FwOiJyb3VuZCI7IHN0cm9rZS1kYXRhOiJ1cmwoIzAwMDAsIj4iLz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAiLz48cmVjdCB4PSI0MCIgeT0iNDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJsaWdodGJsdWU7Ii8+PHJlY3QgeD0iNDAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJsaWdodGJsZXU7Ii8+PC9zdHlsZT4KPC9zdmc+Cg=="
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading={currentImageIndex === 0 ? "eager" : "lazy"}
            />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Section Navigation Buttons */}
      <Stack direction="row" gap={2} flexWrap={'wrap'} justifyContent="center" sx={{ mt: { xs: 4, sm: 10 } }}>
        {highlights.map((highlight) => (
          <Button
            key={highlight.title}
            variant={highlight.title === activeSection ? "contained" : "outlined"}
            onClick={() => setActiveSection(highlight.title)}
          >
            {highlight.title}
          </Button>
        ))}
      </Stack>

      {/* Highlights Gallery Section */}
      {/* MODIFIED: Wrapped the mapping in AnimatePresence for smooth section transitions */}
      <AnimatePresence mode="wait">
        {highlights.map((highlight) => (
          highlight.title === activeSection && (
            <motion.div
              key={highlight.title}
              variants={sectionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Box my={{ xs: 4, sm: 6 }} id={highlight.title}>
                <Typography variant="h4" gutterBottom>
                  {highlight.title}
                </Typography>

                {/* NEW: Collapsible Description Box */}
                {highlight.description && (
                  <motion.div
                    variants={descriptionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{ overflow: 'hidden' }} // Crucial for height animation
                  >
                    <Box
                      sx={{
                        p: 2,
                        my: 3,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 2,
                        textAlign: 'left', // Better for reading paragraphs
                        maxWidth: '800px', // Constrain width for readability
                        mx: 'auto' // Center the box
                      }}
                    >
                      <Typography variant="body1">
                        {highlight.description}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
                {/* END: Description Box */}

                <div className="gallery-grid">
                  {/* MODIFIED: Removed AnimatePresence from here as it's now wrapping the parent */}
                  {highlight.images.map((image, imgIndex) => (
                    <motion.div
                      key={imgIndex}
                      custom={imgIndex}
                      initial="hidden"
                      animate="visible"
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
                        priority={imgIndex < 3} // Prioritize first few images in the gallery
                        loading={imgIndex < 3 ? "eager" : "lazy"}
                      />
                    </motion.div>
                  ))}
                </div>
              </Box>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Image Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overlay"
            onClick={handleCloseImage}
          >
            <div className="enlarged-image">
              <Image
                loader={imageKitLoader}
                src={selectedImage}
                alt="Enlarged"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <HomeButton />
    </Container>
  );
};

export default HighlightsPage;