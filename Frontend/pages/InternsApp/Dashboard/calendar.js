import { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { createMeeting, DeleteMeeting, getMeetings, updateMeeting } from '../../../Services/meetingServices';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { getInterns } from '../../../Services/internServices/index.';
import { Toast } from 'primereact/toast';

const CalendarPage = () => {
    const [meetings, setMeetings] = useState([]);
    const [interns, setInterns] = useState([]);
    const [selectedMeeting, setSelectedMeeting] = useState(null);
    const [displayBasic, setDisplayBasic] = useState(false);
    // we will use this variable whenever the update methode is work we will activate the getmethode again(look at useEffect)
    const [isUpdated, setIsUpdated] = useState(false);
    //const [selectedDates, setSelectedDates] = useState([]);
    const [displayDioa, setDisplayDiao] = useState(false);
    const [selectedStart, setSelectedStart] = useState(null);
    const [intern, setIntern] = useState(null);
    const [title, setTitle] = useState(null);
    const [end, setEnd] = useState(null);
    const toast = useRef();
    //if its update it will show this toast 
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Updated Successfully', life: 3000 });
    };
    //error server it will show this toast 
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error,try again', life: 3000 });
    };

    function handleEventClick(info) {
        console.log(info.event.end)
        const meeting = {
            "start": info.event.start,
            "end": info.event.end,
            "title": info.event.title,
            "internId": info.event._def.extendedProps.internId,
            "admin_supervisorId": info.event._def.extendedProps.admin_supervisorId,
            "id": info.event._def.extendedProps._id
        }
        setSelectedMeeting(meeting);
        console.log(meeting)
        setDisplayBasic(true)
    }


    async function updateMeet(event) {
        event.preventDefault();
        try {
            const success = await updateMeeting(selectedMeeting.id, selectedMeeting.title, selectedMeeting.start, selectedMeeting.end);
            if (success) {
                setDisplayBasic(false)
                setIsUpdated(true);
                showSuccess()

            }
            else {
                showError()

            }
            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }
    async function CreateMeet(event) {
        event.preventDefault();

        try {
            const succes = await createMeeting(title, selectedStart, end, intern)
            if (succes) {
                showSuccess()
                setDisplayDiao(false)
                setIsUpdated(true)

            }
            else {
                showError()
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function deleteMeet() {
        try {
            const success = await DeleteMeeting(selectedMeeting.id);
            if (success) {
                console.log("?")
                setDisplayBasic(false)
                setIsUpdated(true);
                showSuccess()
            }
            else {
                showError()
            }
            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }

    useEffect(() => {
        const fetchMeetings = async () => {
            const meetingsData = await getMeetings();
            if (meetingsData != false) {
                console.log(meetingsData);
                setMeetings(meetingsData);
                setIsUpdated(isUpdated = await false);

            }
            else {

            }
        }
        fetchMeetings();

    }, [isUpdated]);
    useEffect(() => {
        const fetchInterns = async () => {
            const InternsData = await getInterns();
            if (InternsData != false) {
                setInterns(InternsData);
            }
            else {
            }
        }
        fetchInterns();

    }, []);

    return (
        <div>
            <Toast ref={toast} />
            <FullCalendar
                initialView="dayGridMonth"
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                selectable={true}
                select={info => {
                    setSelectedStart(info.startStr)
                    setEnd(info.startStr)
                    setDisplayDiao(true)
                }} events={meetings}
                eventClick={handleEventClick}
            />
            {/* update,delete */}
            <Dialog header="Meeting Info" visible={displayBasic} style={{ width: '30vw' }} modal onHide={() => setDisplayBasic(false)}>
                <div className="card p-fluid">
                    {selectedMeeting && <div><form onSubmit={updateMeet}>
                        <div className="field">
                            <label htmlFor="name1">Title</label>
                            <InputText id="name1" type="text" value={selectedMeeting.title} onChange={(e) =>
                                setSelectedMeeting({
                                    ...selectedMeeting,
                                    title: e.target.value.toString(),
                                })
                            } />
                        </div>
                        <div className="field">
                            <Calendar
                                id="start"
                                showTime={true}
                                value={new Date(selectedMeeting.start)}
                                onChange={(e) =>
                                    setSelectedMeeting({
                                        ...selectedMeeting,
                                        start: e.target.value.toString(),
                                    })
                                }
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        </div>
                        <div className="field">
                            <Calendar
                                id="end"
                                showTime={true}
                                value={new Date(selectedMeeting.end)}
                                onChange={(e) =>
                                    setSelectedMeeting({
                                        ...selectedMeeting,
                                        end: e.target.value.toString(),
                                    })
                                }
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button label="Delete Meeting" onClick={deleteMeet} className=" p-button-danger w-1/2 mr-2 "></Button>
                            <Button label="Update Meeting" type="submit" className="p-button w-1/2" ></Button>
                        </div>

                    </form>

                    </div>

                    }
                </div>
            </Dialog>
            {/* Create Dialog! */}
            <Dialog header="Fix Meeting" visible={displayDioa} style={{ width: '30vw' }} modal onHide={() => setDisplayDiao(false)}>
                <div className="card p-fluid">
                    {selectedStart && <div><form onSubmit={CreateMeet} >
                        <div className="field">
                            <label htmlFor="title">Title</label>
                            <InputText id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="role">Start Date,Time</label>
                            <Calendar
                                id="start"
                                showTime={true}
                                value={new Date(selectedStart)}
                                onChange={(e) =>
                                    setSelectedStart(e.target.value.toString())
                                }
                                dateFormat="yy-mm-dd"
                                showIcon
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="role">End Date,Time</label>
                            <Calendar
                                id="end"
                                showTime={true}
                                dateFormat="yy-mm-dd"
                                showIcon
                                required
                                value={new Date(end)}
                                onChange={(e) =>
                                    setEnd(e.target.value.toString())
                                }
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="role">Intern</label>
                            <Dropdown options={interns} optionLabel="name" optionValue="_id" value={intern} onChange={(e) => setIntern(e.value)}
                                placeholder="Select" required />
                        </div>
                        <div className="flex justify-between">
                            <Button label="Fix Meet" type="submit" className="p-button w-1/2" ></Button>
                        </div>

                    </form>

                    </div>

                    }
                </div>
            </Dialog>
        </div>
    );
};

export default CalendarPage;
