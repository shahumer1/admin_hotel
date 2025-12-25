import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { bookings as bookingsAPI } from '../services/api';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await bookingsAPI.list();
        const ev = data.map(b => ({ id: b._id, title: `${b.guest} - Room ${b.room}`, start: b.from, end: b.to }));
        setEvents(ev);
      } catch (err) {
        console.error('Failed to load bookings', err.message);
      }
    };
    load();
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>Bookings Calendar</Typography>
      <Paper sx={{ p: 2 }}>
        <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" events={events} />
      </Paper>
    </div>
  );
}
