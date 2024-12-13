'use client';

import React from 'react';
import { useSession, signIn } from 'next-auth/react';
import { Container, Typography, Box, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';
import courses from '@/data/courses';
import CourseCard from './CourseCard';
 
const Courses = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (!session) {
    return (
      <Container
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ width: '100%',height: '100vh', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
      >
        <Typography variant="h4" gutterBottom>
          Please sign in to view the courses
        </Typography>
        <Button variant="contained" color="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      </Container>
    );
  }

  return (
    <Container
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ width: '100%', my: { xs: 15, sm: 19, md: 24 }, textAlign: 'center' }}
    >
      <Typography variant="h1" gutterBottom>
        Courses
      </Typography>
      {Object.keys(courses).map((category) => (
        <Box key={category} my={4}>
          <Typography variant="h4" gutterBottom>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Typography>
          <Grid container spacing={4}>
            {courses[category].map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default Courses;
