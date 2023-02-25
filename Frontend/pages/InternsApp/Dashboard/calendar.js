import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { getMeetings } from '../../../Services/meetingServices';

const CalendarPage = () => {
    const [meetings, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDates, setSelectedDates] = useState([]);
    function handleEventClick(info) {
        setSelectedEvent(info.event);
        console.log(info.event)
    }
    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getMeetings();
            if (tasksData != false) {
                setEvents(tasksData);
                console.log(tasksData)
            }
        }
        fetchTasks();

    }, []);

    return (
        <div>
            <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                events={meetings}
                eventClick={handleEventClick}
            />
        </div>
    );
};

export default CalendarPage;
