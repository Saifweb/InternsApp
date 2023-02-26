import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { getTasks } from '../../../Services/taskServices/index';
import { deleteTask } from '../../../Services/taskServices/index';
import { updateTask } from '../../../Services/taskServices/index';
import { updateTask1 } from '../../../Services/taskServices/index';
import { getInterns } from '../../../Services/taskServices/index';




const TaskPage = () => {

    const [filters1, setFilters1] = useState(null);

    const [isUpdated, setIsUpdated] = useState(false);
    const dateBodyTemplate = (rowData) => {

        if (rowData.date) {
            const date = new Date(rowData.date);
            if (!isNaN(date.getTime())) {
                return date.toDateString();
            }
        }
        return null;
    };





    const activityBodyTemplate = (rowData) => {
        const [sliderValue, setSliderValue] = useState(parseFloat(rowData.completed));

        const handleSliderChange = async (e) => {
            try {
                const completedString = e.value.toString();
                const updatedTask = await updateTask(rowData._id, completedString);
                setSliderValue(parseFloat(updatedTask.completed));
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        return (
            <Slider value={sliderValue} onChange={handleSliderChange} />
        );
    };

    const [value, setValue] = useState([0, 100]);


    const activityFilterTemplate = (options) => {

        const handleChange = (e) => {
            setValue(e.value);
            const filter = JSON.stringify(e.value).trim(); // Convert object to string before calling trim()
            options.filterCallback(filter);
            console.log(filter)
        };

        return (
            <React.Fragment>
                <Slider value={value} onChange={handleChange} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        );
    };




    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updateDialogVisible, setUpdateDialogVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await getTasks();
                setTasks(response1);
                if (response1.status == "200") {
                    setUpdateDialogVisible(updateDialogVisible = await false);

                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [updateDialogVisible]);


    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await updateTask1(updatedTask._id, updatedTask);
            if (response.status === 200) {
                const updatedTaskData = await response.json();
                setTasks((prevTasks) => {
                    const updatedTasks = prevTasks.map((task) =>
                        task._id === updatedTaskData._id ? updatedTaskData : task
                    );
                    return updatedTasks;
                });

                setIsUpdated(true);
                setUpdateDialogVisible(false);
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(async () => {
        const fetchTasks = async () => {
            const tasksData = await getTasks();
            const internData = await getInterns();
            setTasks(tasksData);
            setUsers(internData);


            if (tasksData.status == "200") {
                const data = await tasksData.json();
                const data1 = await internData.json();
                setIsUpdated(isUpdated = await false);
            }
        }
        fetchTasks();
    }, [isUpdated]);





    const deleteBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => { deleteTask(rowData._id); setIsUpdated(true); }} />
        );
    }


    const updateBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-primary"
                onClick={() => {
                    setSelectedTask(rowData);
                    setUpdateDialogVisible(true);
                }}
            />
        );
    };

    const updateDialogFooter = (
        <>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setUpdateDialogVisible(false)}
            />
            <Button
                label="Update"
                icon="pi pi-check"
                className="p-button-primary"
                onClick={() => {
                    handleUpdateTask(selectedTask);
                    setUpdateDialogVisible(false);
                }}
            />
        </>
    );

    console.log(selectedTask)


    const findUserNameById = (userId) => {
        const user = users.find(user => user._id === userId);
        if (user) {
            return user.name;
        } else {
            return '';
        }
    }

    const nameOfUser = (rowData) => {
        return (findUserNameById(rowData.userId))
    }


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Filter Menu</h5>
                    <DataTable
                        value={tasks}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        responsiveLayout="scroll"
                        emptyMessage="No tasks found."
                    >
                        <Column field="name" header="Task's name" filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Interns" field="userId" filterField="name" body={nameOfUser} showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} />

                        <Column field="date" header="Deadline" filterField="date" filter filterType="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />

                        <Column field="completed" header="Progress" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate}     filterFunction={(value, filter) => {
    const filterValues = filter.map(parseFloat);
    const currentValue = parseFloat(value);
    return filterValues[0] <= currentValue && currentValue <= filterValues[1];
  }}  />

                        <Column field="verified" header="delete" dataType="boolean" body={deleteBodyTemplate} bodyClassName="text-center" style={{ minWidth: '5rem' }} />
                        <Column field="update" header="Update" dataType="boolean" body={updateBodyTemplate} bodyClassName="text-center" style={{ minWidth: '5rem' }} />

                    </DataTable>



                    <Dialog
                        visible={updateDialogVisible}
                        header="Update Task"
                        footer={updateDialogFooter}
                        onHide={() => setUpdateDialogVisible(false)}
                    >
                        {selectedTask && (
                            <>
                                <div className="p-field">
                                    <label htmlFor="name">Name</label>
                                    <InputText
                                        id="name"
                                        value={selectedTask.name}
                                        onChange={(e) =>
                                            setSelectedTask({ ...selectedTask, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="userId">InternId    </label>
                                    <Dropdown
                                        id="userId"
                                        value={selectedTask.userId}
                                        options={users}
                                        optionLabel="name"
                                        onChange={(e) =>
                                            setSelectedTask({ ...selectedTask, userId: e.target.value })
                                        }
                                        placeholder="Select an intern"
                                    />
                                </div>
                                <div className="p-field">
                                    <label htmlFor="date">Deadline</label>
                                    <Calendar
                                        id="date"
                                        value={new Date(selectedTask.date)}
                                        onChange={(e) =>
                                            setSelectedTask({
                                                ...selectedTask,
                                                date: e.target.value.toString(),
                                            })
                                        }
                                        dateFormat="yy-mm-dd"
                                        showIcon
                                    />
                                </div>
                            </>
                        )}
                    </Dialog>


                </div>
            </div>
        </div>
    );

};
export default TaskPage;



