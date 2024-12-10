'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { Box, Typography, useTheme } from '@mui/material';
import EventCard from '@/components/EventCard';
import { events } from '@/data/events';
import { DateTime } from 'luxon';
import CustomDay from '@/components/CustomDay';

const DatePickerComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const theme = useTheme();
  const eventRefs = useRef({});

  useEffect(() => {
    eventRefs.current = events.reduce((acc, event) => {
      acc[event.id] = React.createRef();
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (selectedEvents.length > 0) {
      const firstEventId = selectedEvents[0].id;
      const ref = eventRefs.current[firstEventId];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [selectedEvents]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    if (newDate) {
      const formattedDate = newDate.toISODate();
      const filteredEvents = events.filter(
        event => DateTime.fromJSDate(event.date).toISODate() === formattedDate
      );
      setSelectedEvents(filteredEvents);

      if (filteredEvents.length > 0) {
        const firstEventId = filteredEvents[0].id;
        const ref = eventRefs.current[firstEventId];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    } else {
      setSelectedEvents([]);
    }
  };

  const eventDates = new Set(events.map(event => DateTime.fromJSDate(event.date).toISODate()));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 2 }}>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={selectedDate}
          onChange={handleDateChange}
          slotProps={{
            textField: { variant: 'outlined' },
          }}
          slots={{
            day: (props) => {
              const isEventDay = eventDates.has(props.day.toISODate());
              const handleClick = () => handleDateChange(props.day);
              return <CustomDay {...props} isEventDay={isEventDay} theme={theme} onClick={handleClick} />;
            },
          }}
        />
      </LocalizationProvider>
      <Box sx={{ mt: 2, width: '100%' }}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map(event => (
            <div key={event.id} ref={eventRefs.current[event.id]}>
              <EventCard event={event} />
            </div>
          ))
        ) : (
          <Typography variant="h6" component="div">
            No events for the selected date.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default DatePickerComponent;
