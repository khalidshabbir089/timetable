
import React, { Fragment, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { baseurl } from '../../baseurl/baseurl';
function TabPanel(props) {

    

    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const Fileuplodit = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  // ==========================================================
  const [filenameroom, setFilenameroom] = useState('Choose File');
  const [selectedFileroom, setSelectedFileroom] = React.useState(null);
  const [messageroom, setMessageroom] = useState('');
  const [uploadPercentageroom, setUploadPercentageroom] = useState(0);
   // ==========================================================
   const [filenamedatesheet, setFilenamedatesheet] = useState('Choose File');
   const [selecteddatesheet, setSelecteddatesheet] = React.useState(null);
   const [messagedatesheet, setMessagedatesheet] = useState('');
   const [uploadPercentagedatesheet, setUploadPercentagedatesheet] = useState(0);
  // ===============================================================
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const handleSubmit = async(event) => {

      if(selectedFile!=null){

      
      event.preventDefault()
      const formData = new FormData();
      formData.append("photo", selectedFile);
      try {
        const response = await axios({
          method: "post",
          url: baseurl+ "/storeCsvFiles/upload",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: progressEvent => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          }
        });
       if(response.status==201){
          setMessage("Your file updated successfully");
          
        }
        setTimeout(() => setUploadPercentage(0), 1000);
     
      } catch(error) {
        console.log(error)
        if (error.response.status === 500) {
          setMessage('There was a problem with the server');
        }
         else {
          setMessage(error.response.data.msg);
        }
        setUploadPercentage(0)
      }
      setFilename("Chose your File")
      setSelectedFile(null)
    }else{
      alert("Please select your File")
      setSelectedFile(null)
    }}
  
    const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0])
      setFilename(event.target.files[0].name);
    }
// =======================Free=============================================

const handleSubmitFreeRoom = async(event) => {

  if(selectedFileroom!=null){
  event.preventDefault()
  const formData = new FormData();
  formData.append("photo", selectedFileroom);
  try {
    const response = await axios({
      method: "post",
      url:baseurl+ "/storeCsvFilesFreeroom/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: progressEvent => {
        setUploadPercentageroom(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      }
    });
   if(response.status==201){
      setMessageroom("Your file updated successfully");
      
    }
    setTimeout(() => setUploadPercentageroom(0), 1000);
 
  } catch(error) {
    console.log(error)
    if (error.response.status === 500) {
      setMessageroom('There was a problem with the server');
    }
     else {
      setMessageroom(error.response.data.msg);
    }
    setUploadPercentageroom(0)
  }
  setFilenameroom("Chose your File")
  setSelectedFileroom(null)
}else{
  alert("Please select your File")
  setSelectedFileroom(null)
}}

const handleFileSelectFreeRoom = (event) => {
  setSelectedFileroom(event.target.files[0])
  setFilenameroom(event.target.files[0].name);
}
// ===============================DateSheet========================================

const handleSubmitDateSheet = async(event) => {

  if(selecteddatesheet!=null){
  event.preventDefault()
  const formData = new FormData();
  formData.append("photo", selecteddatesheet);
  try {
    const response = await axios({
      method: "post",
      url:baseurl+ "/storeCsvFilesDateSheet/upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: progressEvent => {
        setUploadPercentagedatesheet(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      }
    });
   if(response.status==201){
      setMessagedatesheet("Your file updated successfully");
      
    }
    setTimeout(() => setUploadPercentagedatesheet(0), 1000);
 
  } catch(error) {
    console.log(error)
    if (error.response.status === 500) {
      setMessagedatesheet('There was a problem with the server');
    }
     else {
      setMessagedatesheet(error.response.data.msg);
    }
    setUploadPercentagedatesheet(0)
  }
  setFilenamedatesheet("Chose your File")
  setSelecteddatesheet(null)
}else{
  alert("Please select your File")
  (null)
}}

const handleFileSelectSheet = (event) => {
  setSelecteddatesheet(event.target.files[0])
  setFilenamedatesheet(event.target.files[0].name);
}
// ================================================

const updatealldata = async (e) => {
  e.preventDefault();

  const res2 = await fetch(baseurl+"/update/lectures/status", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "",
    }),
  });

  const data2 = await res2.json();
  console.log(data2);

  if (res2.status === 422 || !data2) {
    alert("fill the data");
  } else {
    alert("Data reset clearfully");
   
  }
};


// ===============Free Room End==============================================
  return (
    <div className='content-wrapper contentbg-wrappers mt-5 p-3'>
      <h1 className=''>File uploads</h1>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Timetable" {...a11yProps(0)} />
          <Tab label="FreeRoom" {...a11yProps(1)} />
          <Tab label="DateSheet" {...a11yProps(2)} />
          <Tab label="Repeat Files" {...a11yProps(3)} />
        </Tabs>
      </Box>
        <TabPanel value={value} index={0}>
          <div className=' fileuploadingcard mw-75 d-flex flex-column p-3 p-lg-5'>

            {message ? <div className='alert alert-info alert-dismissible fade show' role='alert'>
              {message}
              <button
                type='button'
                className='close'
                data-dismiss='alert'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div> : null}
            <h3 className='text-center'>Timetable</h3>
            <p className='text-lg'>Please uplod <b>Timetable </b>csv file</p>
            <ul>
              <li>Make sure your file must be .csv formate</li>
              <li>Make sure your file must have same header names (Classess, Subjects, Lecture, Day, Teacher, Room, Status)</li>
            </ul>
            <form className='w-100' onSubmit={handleSubmit}>
              <div className='custom-file mb-4'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='customFile'
                  accept=".csv"
                  onChange={handleFileSelect}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  {filename}
                </label>
              </div>
              <div className='progress'>
                <div
                  className='progress-bar progress-bar-striped bg-success'
                  role='progressbar'
                  style={{ width: `${uploadPercentage}%` }}
                >
                  {uploadPercentage}%
                </div>
              </div>


              <button className='btn btn-primary mt-3 w-100'>Upload</button>
            </form>


          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className=' fileuploadingcard mw-75 d-flex flex-column  p-3 p-lg-5'>

            {messageroom ? <div className='alert alert-info alert-dismissible fade show' role='alert'>
              {messageroom}
              <button
                type='button'
                className='close'
                data-dismiss='alert'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div> : null}
            <h3 className='text-center'>Free Rooms</h3>
            <p className='text-lg'>Please uplod <b>Free Rooms </b>csv file</p>
            <ul>
              <li>Make sure your file must be .csv formate</li>
              <li>Make sure your file must have same header names (Day, Lecture, Classes)</li>
            </ul>
            <form className='w-100' onSubmit={handleSubmitFreeRoom}>
              <div className='custom-file mb-4'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='customFile'
                  accept=".csv"
                  onChange={handleFileSelectFreeRoom}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  {filenameroom}
                </label>
              </div>
              <div className='progress'>
                <div
                  className='progress-bar progress-bar-striped bg-success'
                  role='progressbar'
                  style={{ width: `${uploadPercentageroom}%` }}
                >
                  {uploadPercentageroom}%
                </div>
              </div>


              <button className='btn btn-primary mt-3 w-100'>Upload</button>
            </form>


          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className=' fileuploadingcard mw-75 d-flex flex-column  p-3 p-lg-5'>

            {messagedatesheet ? <div className='alert alert-info alert-dismissible fade show' role='alert'>
              {messagedatesheet}
              <button
                type='button'
                className='close'
                data-dismiss='alert'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div> : null}
            <h3 className='text-center'>Datesheet</h3>
            <p className='text-lg'>Please uplod <b>Datesheet </b>csv file</p>
            <ul>
              <li>Make sure your file must be .csv formate</li>
              <li>Make sure your file must have same header names (Day, Lecture, Classes)</li>
            </ul>
            <form className='w-100' onSubmit={handleSubmitDateSheet}>
              <div className='custom-file mb-4'>
                <input
                  type='file'
                  className='custom-file-input'
                  id='customFile'
                  accept=".csv"
                  onChange={handleFileSelectSheet}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                  {filenamedatesheet}
                </label>
              </div>
              <div className='progress'>
                <div
                  className='progress-bar progress-bar-striped bg-success'
                  role='progressbar'
                  style={{ width: `${uploadPercentagedatesheet}%` }}
                >
                  {uploadPercentagedatesheet}
                </div>
              </div>


              <button className='btn btn-primary mt-3 w-100'>Upload</button>
            </form>


          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <div className="text-center"  >
            <button className="btn btn-primary  text-center m-5 w-50 " onClick={updatealldata}  >
              {" "}  Reset  </button>
          </div>


          </TabPanel>
     
    </Box>

    </div>
    
  )
}

export default Fileuplodit

