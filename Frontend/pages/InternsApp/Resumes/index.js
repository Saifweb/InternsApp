import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { getAllResume } from '../../../Services/resumeservice/index.js';
import { updateResume } from '../../../Services/resumeservice/index.js';
import { downloadAllResumeAsCSV } from '../../../Services/resumeservice/index.js';




const ResumesPage = () => {
    const [positions, setPositions] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function downloadFile(resume) {
        // const link = document.createElement('a');
        // link.href = resume;
        // link.setAttribute('download', '');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
        window.open(resume, '_blank');
    }

    
useEffect(() => {
    getAllResume()
      .then((data) => {
        if (Array.isArray(data)) {
          setResumes(data);
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
        const positions = resumes.length > 0 ? resumes.map((resume) => resume.status) : [];
        setPositions(positions);
      }, [resumes]);

    const formatDate = (value) => {
        // if (!value) {
        //     return 'Not Scheduled'; // return empty string if value is undefined
        // }
        const dateObject = new Date(value);
        return dateObject.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const EmailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.email}</span>
            </React.Fragment>
        );
    };

    const dateBodyTemplate = (rowData) =>{
        const [showDialog, setShowDialog] = useState(false);
        const [selectedDate, setSelectedDate] = useState(null);
        const [showPopup, setShowPopup] = useState(false);
        const [scheduledDate, setScheduledDate] = useState(null);
        
        
        const handleScheduleCancel = () => {
            
            setShowPopup(false);
          };
        // const scheduleDate = () => {
        //   // Save the selected date and hide the dialog
        //   setSelectedDate(selectedDate);
        //   setShowDialog(false);
        // };
        const handleScheduleClick = () => {
            setShowPopup(true);
          };
          const handleDateSelect = (e) => {
            setScheduledDate(e.value);

          };
          const handleScheduleSave = async () => {
            try {
            //   const success = await updateResume(rowData._id, scheduledDate);
            //   if (success) {
            //     // Update the date of interview in rowData if update is successful
            //     rowData.dateOfInterview = scheduledDate;
            //   }
            updateResume(rowData._id, scheduledDate);
            console.log("hello")
              setShowPopup(false);
            } catch (error) {
              console.error(error);
              // Handle error
            }
          };
      
        // if (rowData.preselection) {
        //   // If the row is verified
        //   if (rowData.dateOfInterview == null) {
        //         <div>
        //             <Button label="Schedule" onClick={handleScheduleClick} />
        //             {showPopup && (
        //             <div className="p-fluid">
        //                 <Calendar
        //                 value={scheduledDate}
        //                 onChange={handleDateSelect}
        //                 showIcon
        //                 inputClassName="w-full"
        //                 dateFormat="mm/dd/yy"
        //                 placeholder="MM/DD/YYYY"
        //                 monthNavigator
        //                 yearNavigator
        //                 yearRange="2020:2030"
        //                 />
        //             </div>
        //             )}
        //         </div>
        //   } else {
        //     // If the date is scheduled, show the date
        //     return formatDate(rowData.dateOfInterview);
        //   }
        // } else {
        //   // If the row is not verified
        //   return "Not Eligible";
        // }
      
        // return (
        //   <Dialog header="Schedule Date" visible={showDialog} onHide={() => setShowDialog(false)}>
        //     <Calendar value={selectedDate} onChange={(e) => setSelectedDate(e.value)} />
        //     <Button label="Schedule" onClick={scheduleDate} />
        //   </Dialog>
        // );
        const schedulePopup = (
            <div className="p-fluid">
              <Calendar
                value={scheduledDate}
                onChange={handleDateSelect}
                showIcon
                inputClassName="w-full"
                dateFormat="mm/dd/yy"
                placeholder="MM/DD/YYYY"
                monthNavigator
                yearNavigator
                yearRange="2020:2030"
              />
              <div className="mt-4 flex justify-end">
                <Button label="Cancel" onClick={handleScheduleCancel} className="mr-4" />
                <Button label="Save" onClick={handleScheduleSave} />
              </div>
            </div>
          );
          
          if (rowData.preselection) {
            // If the row is verified
            if (rowData.dateOfInterview == null) {
              return (
                <div>
                  <Button label="Schedule" onClick={handleScheduleClick} />
                  {showPopup && schedulePopup}
                </div>
              );
            } else {
              // If the date is scheduled, show the date
              return formatDate(rowData.dateOfInterview);
            }
          } else {
            // If the row is not verified
            return "Not Eligible";
          }
      };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
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
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.preselection, 'text-pink-500 pi-times-circle': !rowData.preselection })}></i>;
    };
    const FinalverifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.selected, 'text-pink-500 pi-times-circle': !rowData.selected })}></i>;
    };
    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.preSelection} onChange={(e) => options.filterCallback(e.value)} />;
    };
    function downloadBodyTemplate(rowData) {
        return (
            <Button icon="pi pi-file-pdf" onClick={() => downloadFile(rowData.resume)} />
        );

    };



    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Filter Menu</h5>
                    {isLoading ? (
                        <p>Loading...</p>   
                    ) : (
                    <DataTable
                        value={resumes}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        loading={isLoading}
                        responsiveLayout="scroll"
                        emptyMessage="No resumes found."

                    >

                        <Column header="Email" filterField="Email" style={{ minWidth: '10rem' }} body={EmailBodyTemplate} />
                        <Column field="Position" header="Position" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                        <Column header="Date of interview" filterField="date" dataType="date" style={{ minWidth: '8rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                        <Column field="Pre-Selection" header="Pre-Selection" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                        <Column field="Final-Selection" header="Final-Selection" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '6rem' }} body={FinalverifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                        <Column field="Resume" header="Resume" bodyClassName="text-center" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '5rem' }} body={downloadBodyTemplate} />
                        
                    </DataTable>
                    )}
                </div>
            </div>




        </div>
    );
};

export default ResumesPage;



export const downloadResumeData = async () => {
    const resumes = await getAllResume();
    const jsonData = JSON.stringify(resumes);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resumes.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
