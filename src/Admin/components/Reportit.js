import React from 'react'
import { useState, useEffect,useRef } from "react";
import {CSVLink} from "react-csv"
// ================================================
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { BiTime } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import Modal from '@mui/material/Modal';
import generatePDF from "./ReportPdf";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Inputbutton from './lecture/Updatabtn';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import HashLoader from "react-spinners/HashLoader";
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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, calories, fat) {
  return { name, calories, fat };
}
// =============================================
const Reportit = () => {
    const [FilterData, setFilterData] = useState([]);
    const [defaultdata, setDefaultdata] = useState([]);
    const [date, setdate] = useState("");
    const [getday, setday] = useState();
    const [show, setShow] = useState(true);
    const [showclass, setShowclass] = useState(true);
    const [showroom, setShowroom] = useState(true);
    const [showslote, setShowslote] = useState(true);
    const [valuet, setvalue] = useState("");
    const [valueclass, setvalueclass] = useState("");
    const [valueroom, setvalueroom] = useState("");
    const [valueslote, setvalueslote] = useState("");
    const [getserchsuggestion, setsearchsuggestion] = useState("");
    const [getserchsuggestionclass, setsearchsuggestionclass] = useState("");
    const [getserchsuggestionroom, setsearchsuggestionroom] = useState("");
    const [getserchsuggestionslote, setsearchsuggestionslote] = useState("");
    const [gettoday, settoday]=useState();
    const [getcsvfilter,setcsvfilter]=useState([]);
    const [getstartdate,setstartdate]=useState([])
    const [getenddate,setenddate]=useState([])
    const exampleInput = useRef();
    const [visibleloading,setvisibleloading]=useState(true)
// =================================================================


    /*==================For today date Funciton =============================*/
     const settodayfunction=()=>{
      var today = new Date();
      settoday(today)

     }
    const getdate = () => {
      var today = new Date(),
        date =today.getFullYear() +"-" +(today.getMonth() + 1) +"-" +today.getDate();
      //  var dayis= today.getDay()
      //  alert(dayis)
      setdate(date);
     
      var dayvalue=1;
      if (dayvalue === 1) {
        setday("10000");
      } else if (dayvalue === 2) {
        setday("1000");
      }
      else if (dayvalue === 3) {
        setday("100");
      }
      else if (dayvalue === 4) {
        setday("10");
      }
      else if (dayvalue === 5) {
        setday("1");
      }
  
      
    };
  
    useEffect(() => {
      getdate();
      settodayfunction();
     
   }, []);
  
    /*==================For today date Funciton =============================*/

    const getdata = async () => {
  
      const res = await fetch(baseurl+ "/lecturerocord/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
        data.reverse()
      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        setFilterData(data)
        setDefaultdata(data)
        setvisibleloading(false)
        
        
      }
    };
    useEffect(() => {
      getdata();    
    }, []);
  
  
    /*============================Fetch object End==============================================*/
  
  
    const lecturetime = (slot) => {
      if (slot === "1") {
        return "8:30 AM     to  10:00 AM";
      } else if (slot === "2") {
        return "10:00 AM    to  11:30 AM";
      } else if (slot === "3") {
        return "11:30 AM    to  01:00 PM";
      } else if (slot === "4") {
        return "01:30 PM    to  03:00 PM";
      } else if (slot === "5") {
        return "03:00 AM    to  04:30 AM";
      }
    };
    const day_value = (slot) => {
      if (slot === "10000") {
        return "Monday";
      } else if (slot === "1000") {
        return "Tuesday";
      }
      else if (slot === "100") {
        return "Wednesday";
      }
      else if (slot === "10") {
        return "Thursday";
      }
      else if (slot === "1") {
        return "Friday";;
      }else{
        return slot
      }
    };
  

    // ========================================
    const searchsuggestion = (text) => {
      setvalue(text);
      if (!text) {
        setsearchsuggestion([]);
        setFilterData(defaultdata)
      } else {
        const matches = FilterData.filter((obj) => {
          const regex = new RegExp(`${text}`, "gi");
          return obj.Teacher.match(regex);
  
        });
        const unique = matches.filter((obj, pos, arr) => {
          return (
            arr.map((mapObj) => mapObj.Teacher).indexOf(obj.Teacher) == pos
          );
        });
        setsearchsuggestion(unique);
        console.log(unique);
      }
    };
  // ===============================================
  const searchsuggestionclass = (textx) => {
    setvalueclass(textx);
    if (!textx) {
      setsearchsuggestionclass([]);
      setFilterData(defaultdata)
    } else {
      const matches = FilterData.filter((obj) => {
        return obj.Classess.match(textx);
  
      });
      const unique = matches.filter((obj, pos, arr) => {
        return (
          arr.map((mapObj) => mapObj.Classess).indexOf(obj.Classess) == pos
        );
      });
      setsearchsuggestionclass(unique);
      console.log(unique);
    }
  };
  
    // ===============================================
    const searchsuggestionroom= (textx) => {
      setvalueroom(textx);
      if (!textx) {
        setsearchsuggestionroom([]);
        setFilterData(defaultdata)
      } else {
        const matches = FilterData.filter((obj) => {
          return obj.Room.match(textx); 
        });
        const unique = matches.filter((obj, pos, arr) => {
          return (
            arr.map((mapObj) => mapObj.Room).indexOf(obj.Room) == pos
          );
        });
        setsearchsuggestionroom(unique);
        console.log(unique);
      }
    };
  
    const searchsuggestionslote= (textx) => {
    
      setvalueslote(textx);
      if (!textx) {
        setsearchsuggestionslote([]);
        setFilterData(defaultdata)
      } else {
        const matches = FilterData.filter((obj) => {
          return obj.Lecture.match(textx);
    
        });
        console.log(matches)
  
    
      
        const unique = matches.filter((obj, pos, arr) => {
          return (
            arr.map((mapObj) => mapObj.Lecture).indexOf(obj.Lecture) == pos
          );
        });
        setsearchsuggestionslote(unique);
        console.log(unique);
      }
    };
  
    // =====================================
    const onSearch = (searchTerm) => {
      if (searchTerm === "") {
      } else {
        const filterdatav = FilterData.filter(
          (datavalues) => datavalues.Teacher == searchTerm.trim()
        );
        setFilterData(filterdatav);
        console.log(searchTerm);
      }
    };
    // ==============================================
    const onSearchclass = (searchTerm) => {
      
      if (searchTerm == "") {
        alert("empty")
      } else {
        const filterdatav = FilterData.filter(
          (datavalues) => datavalues.Classess === searchTerm
        );
        setFilterData(filterdatav);
        console.log(searchTerm);
      }
    };
    // ==================================
    const onSearroom = (searchTerm) => {
  
      if (searchTerm === "") {
      } else {
        const filterdatav = FilterData.filter(
          (datavalues) => datavalues.Room == searchTerm.trim()
        );
  
        setFilterData(filterdatav);
        console.log(valueroom);
      }
    };

    // ===========================================
    const onSearchslote = (searchTerm) => {
    
      if (searchTerm === "") {
      } else {
        const filterdatav = FilterData.filter(
          (datavalues) => datavalues.Lecture == searchTerm.trim()
        );
  
       
        setFilterData(filterdatav);
        console.log(valueroom);
      }
    };

    // ===================================

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - FilterData.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

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
  
      const res2 = await fetch(baseurl+ `/record/lecturesdelete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const deletedata = await res2.json();
     
  
      if (res2.status === 422 || !deletedata) {
        console.log("error");
        alert("There is an error");
      } else {
        console.log("user deleted");
    
        getdata();
      }
    };
  const [getupdate, setupdate]=useState([""])
    const updatedatavalues=(data)=>{
     handleOpen();
   
     setupdate(data)
    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   const csvfilter=()=>{
    const csvfilters=FilterData.sort((a,b) => a.Option - b.Option).map((obj)=>{
      return{
       'Class': obj.Classess,
       'Subject': obj.Subjects,
       'Teacher':obj.Teacher,
       'Room': obj.Room,
       "Lecture":obj.Lecture,
       'Day':obj.Day,
       'Date':obj.Date,
       'Option':optionValueFunction(obj.Option),
       'Comment': obj.Comment,
      
      }
    })
     setcsvfilter(csvfilters)
 
   }

// =================================================
const onSearhslote = (searchTerm) => {
  
  if (searchTerm === "") {
  }else if(searchTerm==="all"){
    setFilterData(defaultdata);

  }
   else {
    
    const filterdatav = defaultdata.filter(
      (datavalues) => datavalues.Lecture === searchTerm
    );
    
    setFilterData(filterdatav);
  
  }
};

//  =========================================================
const modalclosefun=()=>
{
  handleClose()
  window.location.href = "/Admin/Reports";
}


const datestartfun=(text)=>{


//   const inputTest = exampleInput.current.value;

  if(text ==""){
    setFilterData(defaultdata)
  }
  else {
    const newdates= defaultdata.filter((obj)=>obj.Date===text ).map(items=>items)
    setFilterData(newdates);
  }
//   else{

//  const newdates= FilterData.filter((obj)=>obj.Date===inputTest ).map(items=>items)
  
//  setFilterData(newdates);
 

// }
}




 const optionValueFunction=(value)=>{
if(value==4){
  return "Yes"
}else if(value==3){
  return "Yes"
}else if(value==2){
  return "Late"
}else if(value==1){
  return "No"
}

 }

  return (
      <>
       {
      visibleloading?
      <div className="loading-style" >  <HashLoader color={"#0AA5FF"}  loading={visibleloading} className="" size={100}   aria-label="Loading Spinner"  data-testid="loader"
      /></div>
    :
          <div className="content-wrapper"  >
            <section className="searchsection   mt-5  ">

              <div className=" searchbar  mt-5 p-3 ">

                <div className='row d-flex flex-column flex-lg-row align-items-center justify-content-center'>
                  <div className="d-flex col  mb-2  flex-column align-items-center justify-content-between">

                  <select placeholder="Select Option " onChange={(e) => onSearhslote(e.target.value)} className="w-100  mb-xs-3 mb-lg-0 p-1 rounded-none" style={{ border: "1px solid gray" }}>
                        <option className="" selected disabled >
                          Select Slot
                        </option>
                        <option value={"8:30 AM     to  10:00 AM"}>8:30 to 9:55</option>
                        <option value={"10:00 AM    to  11:30 AM"}>9:55 to 11:20</option>
                        <option value={"11:30 AM    to  01:00 PM"}>11:20 to 12:45</option>
                        <option value={"01:30 PM    to  03:00 PM"}>1:40 to 3:05</option>
                        <option value={"03:00 AM    to  04:30 AM"}>3:05 to 4:30</option>
                        <option value={"all"}>All</option>

                      </select>


                

                  </div>

                  {/* ================================================== */}

                  <div className="d-flex col mb-2 flex-column align-items-center justify-content-between">

                    <div className="input-group input-group-sm">
                      <input className="form-control shadow-none form-control-navbar text-uppercase" value={valuet} onChange={(e) => {
                        setShow(true);
                        searchsuggestion(e.target.value.toUpperCase());
                      }} type="search" placeholder="Teacher name" />
                      <div className="input-group-append">
                        <button className="btn btn-navbar bg-primary shadow-none" onClick={() => onSearch(valuet)} >
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>


                    <div
                      className="scrolldiv w-auto mt-0 suggtionw suggestion"
                      style={{ display: show ? "block" : "none" }}
                    >
                      {getserchsuggestion &&
                        getserchsuggestion.map((data, index) => {
                          return (
                            <>
                              <p
                                onClick={() => {
                                  setvalue(data.Teacher);
                                  setShow((s) => !s);
                                }}
                                className="dropdown-row"
                                key={data.Teacher}
                              >
                                {data.Teacher.replace(/ /g, "")}
                              </p>
                            </>
                          );
                        })}

                    </div>


                  </div>
                  {/* ============================================================================= */}

                  <div className="d-flex col mb-2 flex-column align-items-center justify-content-between">

                    <div className="input-group input-group-sm">
                      <input className="form-control shadow-none text-uppercase" value={valueclass} onChange={(es) => {
                        setShowclass(true);
                        searchsuggestionclass(es.target.value.toUpperCase());
                      }} type="text" placeholder="FA19-BSE-A" />
                      <div className="input-group-append">
                        <button className="btn btn-navbar bg-primary shadow-none" onClick={() => onSearchclass(valueclass)} >
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>

                    <div
                      className="scrolldiv w-auto mt-0 suggtionw suggestion"
                      style={{ display: showclass ? "block" : "none" }}
                    >
                      {getserchsuggestionclass &&
                        getserchsuggestionclass.map((data, index) => {
                          return (
                            <>
                              <p
                                onClick={() => {
                                  setvalueclass(data.Classess);
                                  setShowclass((s) => !s);
                                }}
                                className="dropdown-rowclass"
                                key={data.Classess}
                              >
                                {data.Classess.replace(/ /g, "")}
                              </p>
                            </>
                          );
                        })}

                    </div>


                  </div>

                  {/*=========================================== This is Second ================================ */}

                  <div className="d-flex col mb-2 flex-column align-items-center justify-content-between">

                    <div className="input-group input-group-sm">
                      <input className="form-control shadow-none text-uppercase" value={valueroom} onChange={(es) => {
                        setShowroom(true);
                        searchsuggestionroom(es.target.value.toUpperCase());
                      }} type="text" placeholder="C4" />
                      <div className="input-group-append">
                        <button className="btn btn-navbar bg-primary shadow-none" onClick={() => onSearroom(valueroom)} >
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>

                    <div
                      className="scrolldiv w-auto mt-0 suggtionw suggestion"
                      style={{ display: showroom ? "block" : "none" }}
                    >
                      {getserchsuggestionroom &&
                        getserchsuggestionroom.map((data, index) => {
                          return (
                            <>
                              <p
                                onClick={() => {
                                  setvalueroom(data.Room);
                                  setShowroom((s) => !s);
                                }}
                                className="dropdown-rowclass"
                                key={data.Room}
                              >
                                {data.Room.replace(/ /g, "")}
                              </p>
                            </>
                          );
                        })}

                    </div>
                  </div>

                </div>
                {/* ================================================= */}
              </div>
            </section>
            <div className='row d-flex flex-column flex-md-row align-items-center'>
              <div className='col '><h1 className=' m-3 '>Record Data </h1>
              </div>
              <div className='col '>
                <div className='row'>
                  <div className='col-lg col-md  col-sm col-xs text-center'>
                    <button className='btn mb-2 btn-success text-light'>    <CSVLink style={{ textDecoration: 'none' }} onClick={csvfilter} data={getcsvfilter} className=" d-flex text-light mx-2 text-center "  >  {" "} <DescriptionIcon className="text-light " />  CSV </CSVLink>
                    </button>

                  </div>
                  <div className='col-lg col-md col-sm col-xs  mb-2 text-center'>
                    <button className="btn btn-success m-0 " onClick={() => generatePDF(FilterData.sort((a, b) => a.Option - b.Option), "pdfsave")}  >
                      {" "}  <PictureAsPdfIcon className='me-2' />  PDF  </button>
                  </div>
                  <div className='col-lg col-md  col-sm col-xs  text-center'> <button className="btn btn-success  text-center  " onClick={() => generatePDF(FilterData.sort((a, b) => a.Option - b.Option), "openpdf")} >
                    {" "} <PrintIcon className='mx-1' />  Print </button></div>
                </div> </div>
            </div>

              <section className='px-3 rounded mb-5'>
                <div className=' searchbar pt-0'>
                    
                      <div className='row  py-3  rounded'>
                       
                          <div className=" col d-flex  ">
                               <div className='d-flex align-items-center '>
                                <p className='w-50 m-2'>Start date</p>
                              <input type={"date"}  ref={exampleInput} hintText="Date" className="p-2 border" placeholder="Select date" onChange={(e)=>{
                           
                           datestartfun(e.target.value)
                             
                              }
                                } ></input>
                               
                               </div>

                          </div>
                       
                      
                      </div>
                        <div className='table'>
      
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
         <TableHead className='bg-primary '>
          <TableRow>
            <TableCell className='text-light'  >Classess</TableCell>
            <TableCell className='text-light'  >Subjects</TableCell>
            <TableCell className='text-light'  >Teacher</TableCell>
            <TableCell className='text-light'  >Room</TableCell>
            <TableCell className='text-light'  >Lecture</TableCell>
            <TableCell className='text-light'  >Day</TableCell>
            <TableCell className='text-light'  >Date</TableCell>
            <TableCell className='text-light'  >Option</TableCell>
            <TableCell className='text-light'  >Comment</TableCell>
     
            <TableCell className='text-light'  >Action</TableCell>
            <TableCell className='text-light'  >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? FilterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : FilterData
          ).map((row,key,id) => (
            <TableRow key={row.key}>
              <TableCell component="th" scope="row">
                {row.Classess}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Subjects}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Teacher}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Room}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Lecture}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Day}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Date}
              </TableCell>
              <TableCell component="th" scope="row">
                {optionValueFunction(row.Option)}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.Comment}
              </TableCell>
          
              <TableCell  scope="row" >
                <button className='btn btn-warning d-flex' onClick={() => asktoconfirm(row._id)}><DeleteIcon className='text-light' /> </button>
              </TableCell>
              <TableCell component="th" scope="row">
                <button className='btn btn-primary d-flex' onClick={() => updatedatavalues(row)}> <EditIcon/></button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[50, 100, 250, { label: 'All', value: -1 }]}
              colSpan={3}
              count={FilterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>


    <Modal 
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="border-none" sx={style}>
          <div className='text-end'>  <CloseIcon   onClick={()=> modalclosefun()}/></div>
      
        <div className="w-0 columndivupdate  m-0" >
                   
               
                    <h3 className=" subject mt-3 ">{getupdate.Subjects}</h3>
                    <p className=" teacher mt-3">{getupdate.Teacher}</p>
                    <div className="roombg bg-gray rounded " style={{ padding: "1px 1px" }}>
                      <h2 className="text-center mt-3 fw-bold  room ">
                        {getupdate.Room}
                      </h2>
                    </div>
                    <div className="text-center mt-3 ">
                      <div className="d-sm-flex align-items-center  classdivclassname ">
                        <p className="icons classes">
                          <SiGoogleclassroom />
                        </p>
                        <p className="text-center classess   ">
                          {getupdate.Classess}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="icons mt-3">
                          <BiTime />
                        </p>
                        <p className="text-center lecture ">
                        {getupdate.Lecture}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="icons mt-3">
                          <BiTime />
                        </p>
                        <p className="text-center lecture ">
                        {getupdate.Day}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <Inputbutton
                 class={getupdate.Classess}
                 subject={getupdate.Subjects}
                 teacher={getupdate.Teacher}
                 room={getupdate.Room}
                 lecture={getupdate.Lecture}
                 day={getupdate.Day}
                 date={getupdate.Date}
                 
                 option={getupdate.Option}
                 comment={getupdate.Comment}
                 report={getupdate.Report}
                 id={getupdate._id}
                 />
                   
                  </div>
        </Box>
      </Modal>
                        </div>
                </div>
                 
              </section>

          </div>}
      </>

  )
}

export default Reportit