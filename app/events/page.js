'use client'

import React from 'react';
import { useMediaQuery, useTheme, Box, Typography } from '@mui/material';
import EventCalendar from '@/components/EventCalendar';
import DatePickerComponent from '@/components/DatePickerComponent';
import {motion} from 'framer-motion'

const MainComponent = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }} 
    sx={{textAlign: 'center', py: {xs: 12, sm: 16}, px: 1}}>
      <Typography variant='h1' component='div' gutterBottom>
        TechKshetra Events
      </Typography>
      {isXs ? <DatePickerComponent /> : <EventCalendar />}
    </Box>
  );
};

export default MainComponent;
