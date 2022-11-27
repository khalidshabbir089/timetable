import React, { useState,useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";
import swal from 'sweetalert';
import { baseurl } from '../../baseurl/baseurl';

const DirectorVision = (props) => {
  const [getDescription,setDescription]=useState("")
// ===================================================================

const [getDateValues,setDataValues]=useState("")
const getdataValuesFun = async () => {
  const res = await fetch(baseurl+ "/getdata/directorv", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status === 422 || !data) {
    console.log("error ");
  } else {
    setDataValues(data)
  }
};
useEffect(()=>{
  getdataValuesFun()
})
const [getNameValue,setNameValue]=useState(getDateValues.name)
const [getDescriptionValue,setDescriptionValue]=useState(getDateValues.text)
const [getImageValue,setImageValue]=useState(getDateValues.image)
// =================================================================
const [image, setimage] = useState("");
const [file, setFile] = useState(null);

const onChangimage = (events) => {
  setimage(events.target.files[0]);
  if (events.target.files.length > 0) {
    const file = URL.createObjectURL(events.target.files[0]);
    setFile(file);
    console.log(file)
}
};
const changeOnClick = (e) => {

  const formData = new FormData();
  formData.append("text", getDescriptionValue);
  formData.append("name", getNameValue);
  formData.append("image", image);

  axios
    .post(baseurl+ "/register/directorvison", formData)
    .then((res) => {
     
      swal("Your Record save successfully!",{
        icon: "success",     
        buttons:false,
        timer: 800,
        margin: "300px"
      });
    
    })
    .catch((err) => {
      console.log(err);
    });
};
// =========================================================

  // ================================================================
  return (
    <div className='content-wrapper'>
      <h1 className='mt-5 pt-5 text-center '>Director Vision</h1>
      <div className=' m-5 p-5  d-flex align-items-center justify-content-center'>
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <Avatar className='my-3' src={file} sx={{ width: 150, height: 150 }} alt={getNameValue} />
          <TextField className='w-100 my-3 bg-white' onChange={(e) => setNameValue(e.target.value)} id="outlined-basic" label="Name" value={getNameValue} variant="outlined" />
          <textarea className="form-control" placeholder='Director Vision' id="exampleFormControlTextarea1" onChange={(e) => setDescriptionValue(e.target.value)} value={getDescriptionValue} rows="10" cols={100}></textarea>
          <Button className='mt-3 w-100' variant="contained" component="label">
            <PhotoCamera />
            <input hidden onChange={onChangimage} accept="image/*" single type="file" />
          </Button>

          <Button className='w-100 mt-3 mb-3' color="success" variant="contained" onClick={changeOnClick}>Add</Button>


          {/* <Button className='w-100 mt-3 mb-3' color="success" variant="contained" onClick={updateDirectorVisions}>Update</Button> */}

        </div>

      </div>
    </div>
  )
}

export default DirectorVision