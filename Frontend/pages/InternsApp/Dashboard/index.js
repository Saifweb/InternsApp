import getConfig from 'next/config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import CalendarPage from './calendar';
import { getUsersNumber } from '../../../Services/userServices';
import { getMeetings } from '../../../Services/meetingServices';
const Dashboard = () => {
    const [users, setusers] = useState("");
    const [meetings, setMeetingNumber] = useState([]);

    useEffect(async () => {

        const GetUsersNumber = async () => {
            try {
                const users = await getUsersNumber();
                setusers(users);


            } catch (error) {
                console.error(error);
            }
        };
        GetUsersNumber();


    }, []);
    useEffect(() => {
        const fetchMeetings = async () => {
            const allmetings = await getMeetings();
            if (allmetings != false) {
                setMeetingNumber(allmetings.length);
                console.log(allmetings)
            }
            else {
                setMeetingNumber(0);

            }
        }
        fetchMeetings();

    }, []);

    return (
        <div>
            <div className="grid">
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Number Of Admins</span>
                                <div className="text-900 font-medium text-xl">{users.admin}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-user text-blue-500 text-xl" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Number Of Superviors</span>
                                <div className="text-900 font-medium text-xl">{users.supervisor}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-user text-orange-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Number Of Interns</span>
                                <div className="text-900 font-medium text-xl">{users.intern}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-user text-cyan-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-3">
                    <div className="card mb-0">
                        <div className="flex justify-content-between mb-3">
                            <div>
                                <span className="block text-500 font-medium mb-3">Number Of Meetings</span>
                                <div className="text-900 font-medium text-xl">{meetings}</div>
                            </div>
                            <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                <i className="pi pi-calendar  text-purple-500 text-xl" />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-12 lg:col-6 xl:col-12">
                    <CalendarPage />
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
