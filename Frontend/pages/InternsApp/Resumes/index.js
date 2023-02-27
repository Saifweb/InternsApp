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
import { Dialog } from 'primereact/dialog';


const ResumesPage = () => {
  const [positions, setPositions] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [id, setId] = useState('');
  const [date, setDate] = useState('');
  const [scheduledDate, setScheduledDate] = useState(null);
  const [updated, setUpdated] = useState(false);



  function downloadFile(resume) {
    console.log(resume)
    window.open("http://localhost:3000/" + resume, '_blank');
    window.open(resume, '_blank');
  }


  useEffect(() => {
    getAllResume()
      .then((data) => {
        if (Array.isArray(data)) {
          console.log(data);
          setResumes(data);
          setIsLoading(false);
          setUpdated(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [updated]);
  useEffect(() => {
    const positions = resumes.length > 0 ? resumes.map((resume) => resume.status) : [];
    setPositions(positions);
  }, []);

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
  const handleScheduleSave = async (event) => {
    event.preventDefault();
    try {
      updateResume(id, date);
      setDisplayBasic(false)
      setUpdated(true);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const dateBodyTemplate = (rowData) => {
    const [showDialog, setShowDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const handleScheduleCancel = () => {
      setDisplayBasic(false)
    };
    const handleScheduleClick = () => {
      console.log(id)
      setDisplayBasic(true)

    };
    const handleDateSelect = (e) => {
      setScheduledDate(e.value);

    };
    if (rowData.preSelection) {
      // If the row is verified
      if (rowData.dateOfInterview == null) {
        return (
          <div>
            <Button label="Schedule" onClick={async () => {
              await setId(rowData._id)
              handleScheduleClick()
            }} />
          </div>
        );
      } else {
        // If the date is scheduled, show the date
        return formatDate(rowData.dateOfInterview);
      }
    } else {
      // If the row is not verified
      console.log("ok", rowData.preselection)
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
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.preSelection, 'text-pink-500 pi-times-circle': !rowData.preSelection })}></i>;
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
          <Dialog header="Meeting Info" visible={displayBasic} style={{ width: '30vw' }} modal onHide={() => setDisplayBasic(false)}>
            <div className="card p-fluid">
              {<div><form onSubmit={handleScheduleSave}>
                <div className="field">
                  <Calendar
                    value={date}
                    onChange={(e) => { setDate(e.target.value) }}
                    showIcon
                    inputClassName="w-full"
                    dateFormat="mm/dd/yy"
                    placeholder="MM/DD/YYYY"
                    monthNavigator
                    yearNavigator
                    yearRange="2020:2030"
                  />
                </div>
                <div className="flex justify-between">
                  <Button label="Update" type="submit" className="p-button w-1/2" ></Button>
                </div>

              </form>

              </div>

              }
            </div>
          </Dialog>
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
