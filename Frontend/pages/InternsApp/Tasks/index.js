import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';

import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ToggleButton } from 'primereact/togglebutton';
import { Rating } from 'primereact/rating';
import { CustomerService } from '../../../demo/service/CustomerService';
import { ProductService } from '../../../demo/service/ProductService';
import getConfig from 'next/config';
import { InputText } from 'primereact/inputtext';

import { getTasks } from '../../../Services/taskServices/index';
import { deleteTask } from '../../../Services/taskServices/index';
import { updateTask } from '../../../Services/taskServices/index';
import { updateTask1 } from '../../../Services/taskServices/index';
import { getInterns } from '../../../Services/taskServices/index';




const TaskPage = () => {


    const [customers1, setCustomers1] = useState(null);
    const [customers2, setCustomers2] = useState([]);
    const [customers3, setCustomers3] = useState([]);
    const [filters1, setFilters1] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [filteredValue, setFilteredValue] = useState(null);
    const [dataViewValue, setDataViewValue] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [completionFilter, setCompletionFilter] = useState(null);
    const [idFrozen, setIdFrozen] = useState(false);
    const [products, setProducts] = useState([]);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [expandedRows, setExpandedRows] = useState(null);
    const [allExpanded, setAllExpanded] = useState(false);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];

    const customerService = new CustomerService();
    const productService = new ProductService();

    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Task's name Search" />
                </span>
            </div>
        );
    };



    const balanceTemplate = (rowData) => {
        return (
            <div>
                <span className="text-bold">{formatCurrency(rowData.balance)}</span>
            </div>
        );
    };

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const formatDate = (value) => {
        const date1 = new Date(value);

        return date1.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src={`${contextPath}/demo/images/flag/flag_placeholder.png`} className={`flag flag-${rowData.country.code}`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.country.name}</span>
            </React.Fragment>
        );
    };

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>;
    };

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img
                    alt={representative.name}
                    src={`${contextPath}/demo/images/avatar/${representative.image}`}
                    onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    width={32}
                    style={{ verticalAlign: 'middle' }}
                />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{representative.name}</span>
            </React.Fragment>
        );
    };





    const dateBodyTemplate = (rowData) => {

        if (rowData.date) {
            const date = new Date(rowData.date);
            if (!isNaN(date.getTime())) {
                return date.toDateString();
            }
        }
        return null;
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    };

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    };

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
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


    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-pink-500 pi-times-circle': !rowData.verified })}></i>;
    };

    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;
    };

    const toggleAll = () => {
        if (allExpanded) collapseAll();
        else expandAll();
    };

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
        setAllExpanded(true);
    };

    const collapseAll = () => {
        setExpandedRows(null);
        setAllExpanded(false);
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`${contextPath}/demo/images/product/${rowData.image}`} onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')} alt={rowData.image} className="shadow-2" width={100} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate2 = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    };

    // const rowExpansionTemplate = (data) => {
    //     return (
    //         <div className="orders-subtable">
    //             <h5>Orders for {data.name}</h5>
    //             <DataTable value={data.orders} responsiveLayout="scroll">
    //                 <Column field="id" header="Id" sortable></Column>
    //                 <Column field="customer" header="Customer" sortable></Column>
    //                 <Column field="date" header="Date" sortable></Column>
    //                 <Column field="amount" header="Amount" body={amountBodyTemplate} sortable></Column>
    //                 <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column>
    //                 <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column>
    //             </DataTable>
    //         </div>
    //     );
    // };

    const header = <Button icon={allExpanded ? 'pi pi-minus' : 'pi pi-plus'} label={allExpanded ? 'Collapse All' : 'Expand All'} onClick={toggleAll} className="w-11rem" />;

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <img alt={data.representative.name} src={`${contextPath}/demo/images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} />
                <span className="font-bold ml-2">{data.representative.name}</span>
            </React.Fragment>
        );
    };

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="4" style={{ textAlign: 'right' }} className="text-bold pr-6">
                    Total Customers
                </td>
                <td>{calculateCustomerTotal(data.representative.name)}</td>
            </React.Fragment>
        );
    };

    const calculateCustomerTotal = (name) => {
        let total = 0;

        if (customers3) {
            for (let customer of customers3) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }

        return total;
    };

    const header1 = renderHeader1();





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


    //   useEffect(async () => {
    //     const fetchTasks = async () => {
    //         const tasksData = await getTasks();
    //         const internData = await getInterns();
    //         setTasks(tasksData);
    //         setUsers(internData);


    //         if (tasksData.status == "200") {
    //             const data = await tasksData.json();
    //             const data1 = await internData.json();            
    //             setIsUpdated(isUpdated = await false);
    //         }
    //     }
    //     fetchTasks();
    // }, [isUpdated]);


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



    const userBodyTemplate = (rowData) => {
        const user = users.find(user => user.id === rowData.userId);
        return <span>{user ? user.name : ''}</span>;
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



