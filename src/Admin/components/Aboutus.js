import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState,useEffect } from 'react';
import axios from "axios";
import swal from 'sweetalert';
import { baseurl } from '../../baseurl/baseurl';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


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
const Aboutus = (props) => {
    const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
      setValue(newValue);
      
      if(newValue==1){
        setvisiblebtnadd(true)
      }else if(newValue==0){
        setvisiblebtnadd(false)
      }else{
        setvisiblebtnadd(true)
      }

    }


const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);
// ================================================================================

// ===================================================================
const [getname,setname]=useState()
const [getprofession,setprofession]=useState()
const [getposition,setposition]=useState()
const [image, setimage] = useState("");
const onChangimage = (events) => {
  setimage(events.target.files[0]);
  if (events.target.files.length > 0) {
    const file = URL.createObjectURL(events.target.files[0]);
    setFile(file);
}
};
const changeOnClick = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", getname);
  formData.append("profession", getprofession);
  formData.append("position",getposition );
  formData.append("image", image);

  axios
    .post(baseurl+ "/register/about", formData)
    .then((res) => {
      handleClose()
      swal("Your Record save successfully!",{
        icon: "success",     
        buttons:false,
        timer: 800,
        margin: "300px"
      });
      setimage(null)
      setFile(null)
    })
    .catch((err) => {
      console.log(err);
    });
};

const [file, setFile] = useState(null);

// ===========================================================
const asktoconfirm=(id)=>{
  const ids=id
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Your Record save successfully!",{
        icon: "success", 
        buttons:false,
        timer: 800,
        margin: "300px"
      });
      deleteuser(ids)
    } else {
      swal("Your Record is safe!");
    }
  });
}
const deleteuser = async (id) => {
  
  const res2 = await fetch(baseurl+ `/about/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const deletedata = await res2.json();
  console.log(deletedata);

  if (res2.status === 422 || !deletedata) {
    console.log("error");
   
  } else {
   
   
  }
};
// ========================================================
const [getValues,setValues]=useState([])
const getdataValuesFun = async () => {
  const res = await fetch(baseurl+"/getdata/about", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status === 422 || !data) {
    console.log("error ");
  } else {

    setValues(data);
  }
};
useEffect(()=>{
  getdataValuesFun()
})
const [getvisiblebtnadd,setvisiblebtnadd]=useState(false)

// ========================Post===============================
const [getDescription,setDescription]=useState();
const [getidvalue,setidvalue]=useState()
const getDescriptionValueFun = async (e) => {
  if(getDescription!=""){
    const res = await fetch(baseurl+"/save/aboutusp", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          description:getDescription
      })
  });

  const data = await res.json();
  console.log(data);

  if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");

  } else {
     
    swal("Your Record save successfully!",{
      icon: "success",     
      buttons:false,
      timer: 800,
      margin: "300px"
    });
  }
  }
}

// ============================================
const getdescrioptionvalue_is = async () => {
  const res = await fetch(baseurl+"/getdata/aboutusparagraph", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (res.status === 422 || !data) {
    console.log("error ");
  } else {

    setidvalue(data)
   const desc= data.map((obj)=>obj.description)
   console.log(desc)
    setDescription(desc);
  }
};
useEffect(() => {
  getdescrioptionvalue_is();
 
}, []);

const checkfun=()=>{

const len=getidvalue.length
if(len===0){
  getDescriptionValueFun()
}else{

  const idvalue=getidvalue.map((obj)=>obj._id)
  updatebtn(idvalue)
}

}
// =============================================
  const updatebtn = async (id) => {

    const res2 = await fetch(baseurl+`/updataboutusdesc/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: getDescription,
      })

    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Error")
    } else {
      alert("Your record has been updated!!!")
    }

  }
// =========================================================
const updateTableValues= async(row)=>{

  const formData = new FormData();
  formData.append("name",getUpdateModalname);
  formData.append("profession", getUpdateModalproffession);
  formData.append("position",getUpdateModalposition);
   formData.append("image", imageupdate);
   formData.append("id_Values",getUpdateIDValues)
 
// ==================================================

        //update-profile
        axios.post(baseurl+"/updataboutusValues",formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
          
        })
        .catch(err=>console.log(err))
    }



 

//  =================================================
  // axios.put(`/updataboutus/${getUpdateIDValues}`, formData)
  // .then((res) => {
 
  //   swal("Your Record Update Successfully!",{
  //     icon: "success",     
  //     buttons:false,
  //     timer: 800,
  //     margin: "300px"
  //   });
    
  // })
  // .catch((err) => {
  //   console.log(err);
  // });


//   // const res2 = await fetch(`/updataboutus/${getUpdateIDValues}`,{
//   //   method: "PATCH",
//   //   headers: {
//   //       "Content-Type": "application/json"
//   //   },
//   //   body:formData

    
    
// });

// const data2 = await res2.json();
// console.log(data2);

// if (res2.status === 422 || !data2) {
//   console.log("error ");
// } else {
//   alert("Your record has been updated!!!")
// }
    

// ===========================================
const [openupdate, setOpenupdate] = React.useState(false);
const handleOpenupdate = () => setOpenupdate(true);
const handleCloseupdate = () =>setOpenupdate(false);
const [getUpdateModalname, setUpdateModalname]=useState([])
const [getUpdateModalproffession, setUpdateModalproffession]=useState([])
const [getUpdateModalposition, setUpdateModalnameposition]=useState([])
const [getUpdateModalimage, setUpdateModalimage]=useState([])
const [getUpdateIDValues,setUpdateIDValues]=useState([])
const [imageupdate, setimageupdate] = useState("");
const updatedatavalues=(data)=>{
  handleOpenupdate();
  setUpdateModalname(data.name)
  setUpdateModalproffession(data.profession)
  setUpdateModalnameposition(data.position)
  setUpdateModalimage(baseurl+ `/uploads/${data.image}`)
  // setimageupdate(`/uploads/${data.image}`)
  setUpdateIDValues(data._id)

}
const [fileupdate, setFileupdate] = useState(null);

const onChangimageupdate = (events) => {
  setimageupdate(events.target.files[0]);



};
// ========================Update Values=========================
  return (
    <div className=' content-wrapper  '>
      <h1 className='m-5 pt-5 '>About us</h1>
      <div className=' mb-5 p-3 rounded'>
        <Box sx={{ width: '100%' }}>
          <Box className='d-flex align-items-center justify-content-between' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Description" {...a11yProps(0)} />
              <Tab label="Members" {...a11yProps(1)} />

            </Tabs>
            {
              <div> <button style={getvisiblebtnadd ? { display: 'block' } : { display: 'none' }} className='btn btn-success me-5' onClick={handleOpen}>< PersonAddIcon /></button></div>
            }
          </Box>
          <TabPanel className="  p-0 pb-5" value={value} index={0}>
            <div class="mb-3">

              <div className='d-flex align-items-center justify-content-between'>   <label for="exampleFormControlTextarea1" class="form-label">About us</label>

              </div>

              <textarea class="form-control" placeholder='Write about us' value={getDescription} onChange={(e) => setDescription(e.target.value)} id="exampleFormControlTextarea1" rows="10"></textarea>
           
            </div>
            <div className='d-flex float-end'>

              <button className='btn btn-primary' onClick={() => checkfun()}>Update</button>

            </div>
            
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Images</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Profession</StyledTableCell>
                    <StyledTableCell align="right">Rosition</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    getValues.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          <Avatar alt={row.name} src={`/uploads/${row.image}`} />
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.profession}</StyledTableCell>
                        <StyledTableCell align="right">{row.position}</StyledTableCell>
                        <StyledTableCell align="right">
                          <button className='btn btn-warning shadow-none' onClick={() => asktoconfirm(row._id)} ><DeleteIcon className='text-light' /> </button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <button className='btn btn-primary shadow-none' onClick={
                            ()=>updatedatavalues(row)}> <EditIcon /></button>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

        </Box>
      </div>

      {/* ================================Model==================================== */}
      <div>

        <Modal style={{width:"auto"}}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='d-flex align-items-center justify-content-center'>
              <Avatar sx={{ width: 150, height: 150 }} alt="Remy Sharp" src={file} />

            </div>
            <TextField className='w-100 mt-3' onChange={(e) => setname(e.target.value)} id="standard-basic" label="Name" variant="standard" />
            <TextField className='w-100 mt-3' onChange={(e) => setprofession(e.target.value)} id="standard-basic" label="Profession" variant="standard" />
            <TextField className='w-100 mt-3' onChange={(e) => setposition(e.target.value)} id="standard-basic" label="Position" variant="standard" />
            <Button className='mt-3 w-100' variant="contained" component="label">
              <PhotoCamera />
              <input hidden accept="image/*" onChange={onChangimage} single type="file" />
            </Button>
            <Button className='w-100 mt-3 mb-3' onClick={changeOnClick} color="success" variant="contained">Add</Button>

          </Box>
        </Modal>
      </div>

      <div>
{/* ==================Update modal */}

<Modal style={{width:"auto"}}
          open={openupdate}
          onClose={handleCloseupdate}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='d-flex align-items-center justify-content-center'>
              <Avatar sx={{ width: 150, height: 150 }} alt={getUpdateModalname} src={getUpdateModalimage} />

            </div>
            <TextField className='w-100 mt-3'  value={getUpdateModalname} onChange={(e)=>setUpdateModalname(e.target.value)} id="standard-basic" label="Name" variant="standard" />
            <TextField className='w-100 mt-3' onChange={(e)=>setUpdateModalproffession(e.target.value)} value={getUpdateModalproffession} id="standard-basic" label="Profession" variant="standard" />
            <TextField className='w-100 mt-3' onChange={(e)=>setUpdateModalnameposition(e.target.value)} value={getUpdateModalposition}  id="standard-basic" label="Position" variant="standard" />
            <Button className='mt-3 w-100'  variant="contained" component="label">
              <PhotoCamera />
              <input hidden accept="image/*" onChange={onChangimageupdate} single type="file" />
            </Button>
            <Button className='w-100 mt-3 mb-3' onClick={updateTableValues}   color="success"   variant="contained">Update Values</Button>

          </Box>
        </Modal>


</div>
    </div>
  )
}

export default Aboutus