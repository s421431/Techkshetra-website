'use client';

import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import imageKitLoader from '@/libs/imagekitloader';

const CourseCard = ({ name, url, imagePath, description }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Box
        component={motion.a}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -10 }}
        sx={{
          display: 'block',
          textDecoration: 'none',
        }}
      >
        <Card
          component={motion.div}
          whileHover={{ scale: 1.05 }}
          sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden', cursor: 'pointer' }}
        >
          <CardMedia>
            <Image
              loader={imageKitLoader}
              src={imagePath}
              alt={name}
              width={500}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
          </CardMedia>
          <CardContent
            sx={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              textAlign: 'center',
              p: 1,
            }}
          >
            <Typography variant="h4" component="h3">
              {name}
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default CourseCard;
