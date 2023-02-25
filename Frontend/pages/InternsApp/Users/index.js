//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Button } from 'primereact/button';
// import { Dropdown } from 'primereact/dropdown';

// import { getAllUsers } from '../../../Services/userServices';

// import { InputText } from 'primereact/inputtext';
// import getConfig from 'next/config';

// const UserPage = () => {
    
//     const [dataViewValue, setDataViewValue] = useState(null);
//     const [globalFilterValue, setGlobalFilterValue] = useState('');
//     const [filteredValue, setFilteredValue] = useState(null);
//     const [layout, setLayout] = useState('list');
//     const [sortKey, setSortKey] = useState(null);
//     const [sortOrder, setSortOrder] = useState(null);
//     const [sortField, setSortField] = useState(null);
//     const contextPath = getConfig().publicRuntimeConfig.contextPath;

//     const [user, setUser] = useState([]);
//     const [isUpdated, setIsUpdated] = useState(false);


//     const sortOptions = [
//         { label: 'Done', value: '!state' },
//         { label: 'In Progress', value: 'state' }
//     ];

//     useEffect(() => {
//          // updated to use InternService
//         getAllUsers().then((data) => setDataViewValue(data)); // updated to use getInterns method
//         setGlobalFilterValue('');
//         console.log('oki');
//         console.log(dataViewValue);



//     }, []);

//     const onFilter = (e) => {
//         const value = e.target.value;
//         setGlobalFilterValue(value);
//         if (value.length === 0) {
//             setFilteredValue(null);
//         }
//         else {
//             const filtered = dataViewValue.filter((users) => { // updated to use 'intern' instead of 'product'
//                 return users.name.toLowerCase().includes(value);
//             });
//             setFilteredValue(filtered);
//         }
//     };

//     const onSortChange = (event) => {
//         const value = event.value;

//         if (value.indexOf('!') === 0) {
//             setSortOrder(-1);
//             setSortField(value.substring(1, value.length));
//             setSortKey(value);
//         } else {
//             setSortOrder(1);
//             setSortField(value);
//             setSortKey(value);
//         }
//     };

//     const dataViewHeader = (
//         <div className="flex flex-column md:flex-row md:justify-content-between gap-2">
//             <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Sort By " onChange={onSortChange} />
//             <span className="p-input-icon-left">
//                 <i className="pi pi-search" />
//                 <InputText value={globalFilterValue} onChange={onFilter} placeholder="Search by Name" />
//             </span>
//             <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
//         </div>
//     );

//     const dataviewListItem = (data) => {
//         return (
//             <div className="col-12">
                
//                 <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
//                     <img src={`${contextPath}/demo/images/intern/${data.image}`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" /> {/* updated image path */}
//                     <div className="flex-1 flex flex-column align-items-center text-center md:text-left">
//                         <div className="font-bold text-2xl" label='InernName'>{data.name}</div>
//                         <div className="mb-2" label='InternEmail'>{data.email}</div>
                        
//                     </div>
//                     <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
//                         <Button icon="pi pi-plus"  />
//                     </div>
//                 </div>
//             </div>
//         );
//     };
    
//     const dataviewGridItem = (data) => {
//         return (
//             <div className="col-12 lg:col-4">
//                 <div className="card m-3 border-1 surface-border">
                   
//                     <div className="flex flex-column align-items-center text-center mb-3">
//                         <img src={`${contextPath}/demo/images/product/${data.image}`} alt={data.name} className="w-9 shadow-2 my-3 mx-0" />
//                         <div className="text-2xl font-bold" label='NameOfIntern'>{data.name}</div>
//                         <div className="mb-3" label ='EmailOfIntern'>{data.email}</div>
//                     </div>

//                     <div className="flex align-items-center justify-content-between">
                   
//                         <Button icon="pi pi-plus"  />
//                     </div>
//                 </div>
//             </div>
//         );
//     };
//     const itemTemplate = (data, layout) => {
//         if (!data) {
//             console.log('hhhhhhhh');

//             return;
//         }

//         if (layout === 'list') {
//             console.log(data);

//             return dataviewListItem(data);
//         } else if (layout === 'grid') {
//             console.log(data);

//             return dataviewGridItem(data);
//         }
//     };

//     return (
//         <div className="grid list-demo">
//             <div className="col-12">
//                 <div className="card">
//                     <DataView value={filteredValue || dataViewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataViewHeader}></DataView>
//                 </div>
//             </div>
          
//         </div>
//     );
// };
// export default UserPage;

import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
// import { CustomerService } from '../../../demo/service/CustomerService';
import { Dialog } from 'primereact/dialog';
//import { getAllResume } from '../../../Services/resumeservice/index.js';
import { getAllUsers } from '../../../Services/userServices';

import { InputText } from 'primereact/inputtext';


const UsersPage = () => {
    // const [customers1, setCustomers1] = useState(null);
    // const [loading1, setLoading1] = useState(true);
    const [positions, setPositions] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));


useEffect(() => {
    getAllUsers()
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);
    useEffect(() => {
        const positions = users.length > 0 ? users.map((resume) => resume.status) : [];
        setPositions(positions);
      }, [users]);

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    //template for fields
    const EmailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.email}</span>
            </React.Fragment>
        );
    };
    const NameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.name}</span>
            </React.Fragment>
        );
    };
    const RoleBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.role}</span>
            </React.Fragment>
        );
    };
    const BlockBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.block}</span>
            </React.Fragment>
        );
    };
    


    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.position}`}>{rowData.position}</span>;
    };

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.position} options={positions} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };


    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.preSelection, 'text-pink-500 pi-times-circle': !rowData.preSelection })}></i>;
    };
    const FinalverifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.selected, 'text-pink-500 pi-times-circle': !rowData.selected })}></i>;
    };
    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.preSelection} onChange={(e) => options.filterCallback(e.value)} />;
    };

    const nameFilter = (value, filter) => {
        return value.toLowerCase().includes(filter.toLowerCase());
      };
    



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Users Menu</h5>
                    <div className="p-grid p-justify-center p-align-center">
                    <div className="p-col-12 p-md-6">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search by name" />
                    </div>
                    </div>
                    </div>
                    {isLoading ? (
                        <p>Loading...</p>   
                    ) : (
                    <DataTable
                        value={filteredUsers}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        emptyMessage="No users found."

                        globalFilter={globalFilter}
                        onGlobalFilterChange={(e) => setGlobalFilter(e.target.value)}
                        filterBy={[{ field: 'Name', filterFunction: nameFilter }]}



                    >

                        <Column header="Email" filterField="Email" style={{ minWidth: '10rem' }} body={EmailBodyTemplate} />
                        <Column field="Name" header="Name" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={NameBodyTemplate} />
                        <Column header="Role" filterField="date" style={{ minWidth: '8rem' }} body={RoleBodyTemplate} sortable/>
                        <Column field="Block" header="Block" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={BlockBodyTemplate} sortable/>
                    </DataTable>
                    )}
                </div>
            </div>




        </div>
    );
};

export default UsersPage;


