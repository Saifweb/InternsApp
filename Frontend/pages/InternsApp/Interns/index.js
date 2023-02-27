import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { createTask } from '../../../Services/taskServices/index'


import { getInterns } from '../../../Services/internServices/index..js';

// import { getInterns } from '../../../demo/service/InternService'; // updated import
import { InputText } from 'primereact/inputtext';
import getConfig from 'next/config';

const InternsPage = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic1, setDisplayBasic1] = useState(false);


    const [dataViewValue, setDataViewValue] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [layout, setLayout] = useState('list');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const sortOptions = [
        { label: 'Done', value: '!state' },
        { label: 'In Progress', value: 'state' }
    ];

    useEffect(() => {
        // updated to use InternService
        getInterns().then((data) => setDataViewValue(data)); // updated to use getInterns method
        setGlobalFilterValue('');
    }, []);

    const onFilter = (e) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
        if (value.length === 0) {
            setFilteredValue(null);
        }
        else {
            const filtered = dataViewValue.filter((intern) => { // updated to use 'intern' instead of 'product'
                return intern.name.toLowerCase().includes(value);
            });
            setFilteredValue(filtered);
        }
    };

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const addTask = (data) => {
        console.log("data", data._id, name)
        createTask(name, Date(data.date), data._id)
        setDisplayBasic(false)

    }


    const dataViewHeader = (
        <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
            <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By " onChange={onSortChange} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onFilter} placeholder="Search by Name" />
            </span>
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
    );

    const addSupervisor = (data) => {

        setDisplayBasic1(false)

    }

    const [supervisorOptions, setSupervisorOptions] = useState([]);


    // Define options for supervisors dropdown
    const supervisorList = [
        { label: 'zied', value: 'zied' },
        { label: 'Seifeddine ben hamida', value: 'Seifeddine ben hamida' },
        { label: 'si akrem', value: 'si akrem' }
    ];
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);

    // Function to handle selecting a supervisor from dropdown
    const handleSupervisorChange = (e) => {
        setSelectedSupervisor(e.value);
    };
    const dataviewListItem = (data) => {
        const basicDialogFooter = <Button type="button" label="ADD" onClick={() => addTask(data)} icon="pi pi-check" className="p-button-secondary" />;

        const basicDialogFooter1 = <Button type="button" label="ADD" onClick={() => addSupervisor(data)} icon="pi pi-check" className="p-button-secondary" />;

        return (

            <div className="col-12">
                <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
                    <img src={`${contextPath}/demo/images/intern/${data.image}`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" /> {/* updated image path */}
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="font-bold text-2xl" label='InernName'>{data.name}</div>
                        <div className="mb-2" label='InternEmail'>{data.email}</div>

                    </div>
                    {/* add task */}
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="flex align-items-center justify-content-between">

                            <Dialog header="ADD Task" visible={displayBasic} style={{ width: '30vw', backgroundColor: 'transparent' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                                <div className="card p-fluid">
                                    <div className="field">
                                        <label htmlFor="name">Task's name</label>
                                        <InputText onChange={(e) => setName(e.target.value)} id="name'" type="text" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="deadline">Deadline</label>
                                        <InputText onChange={(e) => setDate(Date(e.target.value))} id="block" type="date" />
                                    </div>

                                </div>
                            </Dialog>
                            <div className="grid">
                                <div className="col-12">
                                    <Button type="button" label="Add Task" icon="pi pi-plus" onClick={() => setDisplayBasic(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* add supervisor */}
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <div className="flex align-items-center justify-content-between">

                            <Dialog header="ADD Supervisor" visible={displayBasic1} style={{ width: '30vw', backgroundColor: 'transparent' }} modal footer={basicDialogFooter1} onHide={() => setDisplayBasic1(false)}>
                                <div className="card p-fluid">
                                    {/* <div className="field">
                                        <label htmlFor="name">Supervisor's name</label>
                                        <InputText onChange={(e) => setName(e.target.value)} id="name'" type="text" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="deadline">Supervisor's email</label>
                                        <InputText onChange={(e) => setDate(Date(e.target.value))} id="block" type="text" />
                                    </div> */}
                                    <div className="field">
                                        <label htmlFor="supervisor-dropdown">Select Supervisor</label>
                                        <Dropdown id="supervisor-dropdown" value={selectedSupervisor} options={supervisorList} onChange={handleSupervisorChange} placeholder="Select a supervisor" />
                                    </div>
                                </div>
                            </Dialog>
                            <div className="grid">
                                <div className="col-12">
                                    <Button type="button" label="Add Supervisor" icon="pi pi-plus" onClick={() => setDisplayBasic1(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const dataviewGridItem = (data) => {
        const basicDialogFooter = <Button type="button" label="ADD" onClick={() => addTask(data)} icon="pi pi-check" className="p-button-secondary" />;
        const basicDialogFooter1 = <Button type="button" label="ADD" onClick={() => addSupervisor(data)} icon="pi pi-check" className="p-button-secondary" />;

        return (
            <div className="col-12 lg:col-4">
                <div className="card m-3 border-1 surface-border">

                    <div className="flex flex-column align-items-center text-center mb-3">
                        <img src={`${contextPath}/demo/images/product/${data.image}`} alt={data.name} className="w-9 shadow-2 my-3 mx-0" />
                        <div className="text-2xl font-bold" label='NameOfIntern'>{data.name}</div>
                        <div className="mb-3" label='EmailOfIntern'>{data.email}</div>
                    </div>
                    {/* add task */}
                    <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
                        <div className="flex align-items-center justify-content-between">

                            <Dialog header="ADD Task" visible={displayBasic} style={{ width: '30vw', backgroundColor: 'transparent' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                                <div className="card p-fluid">
                                    <div className="field">
                                        <label htmlFor="name">Task's name</label>
                                        <InputText onChange={(e) => setName(e.target.value)} id="name'" type="text" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="deadline">Deadline</label>
                                        <InputText onChange={(e) => setDate(Date(e.target.value))} id="block" type="date" />
                                    </div>

                                </div>
                            </Dialog>
                            <div className="grid">
                                <div className="col-12">
                                    <Button type="button" label="Add Task" icon="pi pi-plus" onClick={() => setDisplayBasic(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* add supervisor */}
                    <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                        <div className="flex align-items-center justify-content-between">

                            <Dialog header="ADD Supervisor" visible={displayBasic1} style={{ width: '30vw', backgroundColor: 'transparent' }} modal footer={basicDialogFooter1} onHide={() => setDisplayBasic1(false)}>
                                <div className="card p-fluid">
                                    {/* <div className="field">
                                        <label htmlFor="name">Supervisor's name</label>
                                        <InputText onChange={(e) => setName(e.target.value)} id="name'" type="text" />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="deadline">Supervisor's email</label>
                                        <InputText onChange={(e) => setDate(Date(e.target.value))} id="block" type="text" />
                                    </div> */}
                                    <div className="field">
                                        <label htmlFor="supervisor-dropdown">Select Supervisor</label>
                                        <Dropdown id="supervisor-dropdown" value={selectedSupervisor} options={supervisorList} onChange={handleSupervisorChange} placeholder="Select a supervisor" />
                                    </div>
                                </div>
                            </Dialog>
                            <div className="grid">
                                <div className="col-12">
                                    <Button type="button" label="Add Supervisor" icon="pi pi-plus" onClick={() => setDisplayBasic1(true)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }

        if (layout === 'list') {
            console.log(data);
            return dataviewListItem(data);

        } else if (layout === 'grid') {
            console.log(data);
            return dataviewGridItem(data);
        }
    };

    return (
        <div className="grid list-demo">
            <div className="col-12">
                <div className="card">
                    <DataView value={filteredValue || dataViewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
                </div>
            </div>

        </div>
    );
};
export default InternsPage;