import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { getTaskData } from '../../../Services/internServices/index..js';
import { getMyProfil, updatePassword, updateUserInfo } from '../../../Services/userServices';

import React, { useContext, useState, useRef, useEffect } from 'react';
import { Toast } from 'primereact/toast';
import userCard from './userCard';

import { Chart } from 'primereact/chart';
import { LayoutContext } from '../../../layout/context/layoutcontext';


const ProfilPage = () => {
    //for each input we set a useState to store the value of this input when user write on it 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    //get User 
    const [user, setUser] = useState([]);
    // we will use this variable whenever the update methode is work we will activate the getmethode again(look at useEffect)
    const [isUpdated, setIsUpdated] = useState(false);
    //we will use this variables to know the number of tasks 
    const [TaskData, setTaskData] = useState('');
    //show piechart only for intern :
    const [intern, setIntern] = useState(false);


    // const [TaskCompleted, setTaskCompleted] = useState('');
    // const [TaskNotCompleted, setTaskNotCompleted] = useState('');

    const [options, setOptions] = useState({});
    const [pieData, setPieData] = useState({});
    const { layoutConfig } = useContext(LayoutContext);









    const toast = useRef();
    //if its update it will show this toast 
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Updated Successfully', life: 3000 });
    };
    //error server it will show this toast 
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error,try again', life: 3000 });
    };
    //passwords do not match it will show this toast
    const showErrorMatched = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Passwords do not match', life: 3000 });
    };
    async function updatePass(event) {
        event.preventDefault();
        try {
            if (password == confirmPassword) {
                const success = await updatePassword(password);
                if (success) {
                    setPassword('');
                    setConfirmPassword('');
                    showSuccess()
                }
                else {
                    showError()
                }
            }
            else {
                showErrorMatched()
            }

            // Do something with the response data
        } catch (error) {
            console.error(error);
            // Handle errors
        }
    }
    async function updateInfo(event) {
        event.preventDefault();
        try {
            const success = await updateUserInfo(email, name);
            if (success) {
                setEmail('');
                setName('');
                showSuccess();
                setIsUpdated(true);
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
    useEffect(async () => {
        const GetMyProfil = async () => {
            const response = await getMyProfil();
            if (response.status == "200") {
                const data = await response.json();
                console.log(data);
                setUser(data);
                if (data.role == "intern") {
                    setIntern(true)
                }
                setIsUpdated(isUpdated = await false);
            }
        }
        GetMyProfil();
    }, [isUpdated]);


    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const TaskData = await getTaskData();
                setTaskData(TaskData);
                fixchart(TaskData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTaskData();

        const fixchart = (TaskData) => {
            console.log(TaskData);
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const Data = {
                labels: ['In Progress', 'Completed'],
                datasets: [
                    {
                        data: [TaskData.totalTasks - TaskData.completedTasks, TaskData.completedTasks],
                        backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--teal-500')],
                        hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--teal-400')]
                    }
                ]
            };

            const pieOptions = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true,
                            color: textColor
                        }
                    }
                }
            };
            setOptions({
                pieOptions
            });
            setPieData(Data);
        };
    }, []);

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <form onSubmit={updateInfo}>
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <InputText id="name1" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Email</label>
                            <InputText id="email1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button label="Update" type='submit'></Button>
                        </div>
                    </form>
                </div>
                <div className="card p-fluid">
                    <h5>Advanced</h5>
                    <form onSubmit={updatePass}>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="name2">Password</label>
                                <InputText id="name2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div className="field col">
                                <label htmlFor="password">Confirm Password</label>
                                <InputText id="password2" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                            <div className="mt-4 pt-1">
                                <Toast ref={toast} />
                                <Button label="" icon="pi pi-check" type='submit'></Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <div className="text-center mb-5">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Image" height="100" width="100" className="mb-3 rouneded" />
                        <div className="text-900 text-3xl font-medium mb-3">Welcome,{user.name}</div>
                        <hr />
                        <p className="text-600 font-medium">{user.email}</p>
                        <hr />
                        <p className="text-600 font-medium">{user.block}</p>
                        <hr />
                        <p className="text-900 font-medium">{user.role}</p>
                    </div>
                </div>
                {intern &&
                    <div className="col-12 xl:col-12">
                        <div className="card flex flex-column align-items-center">
                            <h5 className="text-center w-full">My Tasks</h5>
                            <Chart type="pie" data={pieData} options={options.pieOptions}></Chart>
                        </div>
                    </div>
                }

            </div>
        </div>
    );
};

export default ProfilPage;
