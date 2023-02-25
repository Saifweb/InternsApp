import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';



const CalendarPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch events from API or database
        const fetchedEvents = [
            { title: 'Meeting', start: '2023-02-27T14:30:00', end: '2023-02-27T16:30:00' },
            { title: 'Party', start: '2023-03-04T20:00:00', end: '2023-03-05T02:00:00' },
        ];

        setEvents(fetchedEvents);
    }, []);

    return (
        <div>
            <FullCalendar initialView="dayGridMonth" plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} events={events} />
        </div>
    );
};

export default CalendarPage;
