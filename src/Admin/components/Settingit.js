import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";
import swal from 'sweetalert';
import { MdLabelOutline } from 'react-icons/md';
import { Input } from '@mui/material';
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

const Settingit = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
     <div className="content-wrapper"  >

       <div className='container mt-5 p-4'>
       <div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Alert</strong> It is development mode.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
      <h3>Edit profile</h3>
      <p>You can change your password and update your profile.</p>
          <div className='d-flex'>
            <div className='d-flex flex-column ' style={{ width: "50%" }}>
              <div className='d-flex flex-column mt-3 w-100'>
                <label>First name</label>
                <input type="text" class="form-control " id="namesetting" placeholder="First name"></input>
              </div>
              <div className='d-flex flex-column mt-3 w-100'>
                <label>Last name</label>
                <input type="text" class="form-control " id="lastnamesetting" placeholder="Last name"></input>
              </div>
              <div className='d-flex flex-column mt-3 w-100'>
                <label>Email</label>
                <input type="email" class="form-control " id="emailstting" placeholder="example@mail.com"></input>
              </div>
              <div className='d-flex flex-column mt-3 w-100'>
                <label>Phone Number</label>
                <input type="number" class="form-control " id="emailstting" placeholder="+12345678"></input>
              </div>
              <div className='d-flex flex-column mt-3 w-100'>
                <label>Password</label>
                <input type="password" class="form-control " id="emailstting" ></input>
              </div>
              <div className='d-flex flex-column mt-3 w-100'>
                <label>Confirm password</label>
                <input type="password" class="form-control " id="emailstting" ></input>
              </div>
            </div>
            <div className='d-flex flex-column align-items-center ' style={{ width: "50%" }}>
              <div className='d-flex flex-column  align-items-center  mx-auto'><Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 150, height: 150 }}
              />
              
              </div>
              <button className='btn btn-success mt-5 w-75 '>update</button>
                <textarea className='mt-3 w-75 'rows="10" cols={100}></textarea>
              
             
            </div>
            
          </div>
          <button className='btn btn-success mt-3 w-100 mb-5'>Update</button>

       </div>
     </div>
    
    </>
  )
}

export default Settingit