'use client'

import React, { useState, useMemo, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Typography, useTheme } from '@mui/material';
import { events } from '@/data/events';
import EventCard from '@/components/EventCard';
import '@/style/EventCalendar.css';

const EventCalendar = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const cardRefs = useRef({});
  const theme = useTheme();

  useEffect(() => {
    if (selectedEvents.length > 0) {
      const firstCard = cardRefs.current[selectedEvents[0].id];
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }, [selectedEvents]);

  const calendarEvents = useMemo(
    () => {
      const mappedEvents = events.map(event => {
        const date = new Date(event.date);
        const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        return {
          id: event.id,
          title: event.title,
          date: localDate,
          extendedProps: {
            description: event.description,
            image: event.image,
            for: event.for,
            registrationLink: event.registrationLink,
          },
        };
      });
      return mappedEvents;
    },
    []
  );

  const handleDateClick = (info) => {
    const filteredEvents = events.filter(
      event => new Date(new Date(event.date).getTime() - new Date(event.date).getTimezoneOffset() * 60000).toISOString().split('T')[0] === info.dateStr
    );
    setSelectedEvents(filteredEvents);
  };

  const handleEventClick = (info) => {
    const clickedEvent = events.find(event => event.id === parseInt(info.event.id));
    setSelectedEvents([clickedEvent]);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', margin: '0 auto', padding: 2 }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventColor="transparent"
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        contentHeight="auto"
        timeZone="local" 
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: null,
        }}
        eventContent={({ event }) => (
          <Box sx={{
            backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
            width: '100%',
            height: '100%',
            p: 1,
            cursor: 'pointer',
            borderRadius: 1,
          }}>
            <Typography variant="body2" sx={{ whiteSpace: 'collapse', overflow: 'hidden'}}>
              {event.title}
            </Typography>
          </Box>
        )}
      />
      <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
        {selectedEvents.length > 0 ? (
          selectedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              ref={(el) => (cardRefs.current[event.id] = el)}
            />
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

export default EventCalendar;
