import "./Lectures.css";
import React from "react";
import { useState, useEffect } from "react";
import { BiTime } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import Inputbutton from "../inputbutton/Inputbutton";
import HashLoader from "react-spinners/HashLoader";

import EditModal from '../Modaledit'
import { baseurl } from "../../../baseurl/baseurl";
const Lectures = () => {
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
  const [getserchsuggestion, setsearchsuggestion] = useState("");
  const [getserchsuggestionclass, setsearchsuggestionclass] = useState("");
  const [getserchsuggestionroom, setsearchsuggestionroom] = useState("");
  const [getserchsuggestionslote, setsearchsuggestionslote] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  /*==================For today date Funciton =============================*/
  const getdate = () => {
    var today = new Date(),
      date =today.getFullYear() +"-" +(today.getMonth() + 1) +"-" +today.getDate();

      // alert(today.getDay())
    setdate(date);
   
    var dayvalue=today.getDay();
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
   
 }, []);

  /*==================For today date Funciton =============================*/
   const [visibleloading,setvisibleloading]=useState(true)
  const getdata = async () => {

    const res = await fetch(baseurl+"/lecture/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

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
    }
  };


  // ========================================
  const searchsuggestion = (text) => {
    setvalue(text);
    if (!text) {
      setsearchsuggestion([]);
      setFilterData(defaultdata)
      window.location.reload(true)
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
    window.location.reload(true)
    
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
      window.location.reload(true)
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
  // =====================================

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
  // ===================================
  const lecturetimereverse = (slot) => {
    if (slot === "8:30 AM     to  10:00 AM") {
      return "1";
    } else if (slot === "10:00 AM    to  11:30 AM") {
      return "2";
    } else if (slot === "11:30 AM    to  01:00 PM") {
      return "3";
    } else if (slot === "01:30 PM    to  03:00 PM") {
      return "4";
    } else if (slot === "03:00 AM    to  04:30 AM") {
      return "5";
    
    } else if (slot === "1") {
      return "1";
    
    } else if (slot === "2") {
      return "2";
    
    } else if (slot === "3") {
      return "3";
    
    } else if (slot === "4") {
      return "4";
    
    } else if (slot === "5") {
      return "5";
    }
  };
  // ==============================
  const onSearhslote = (searchTerm) => {
  
    if (searchTerm === "") {
    }else if(searchTerm==="all"){
      setFilterData(defaultdata);

    }
     else {
      
      const filterdatav = defaultdata.filter(
        (datavalues) => datavalues.Lecture == searchTerm
      );
      
      setFilterData(filterdatav);
    
    }
  };


  // =================Show More===========================
  const [visible,setvisible]=useState(32)
  const [isShown, setIsShown] = useState(true);

  useEffect(()=>{
    const t= FilterData.length;
     if(t>=1){
      setIsShown(true)
     }else{
      setIsShown(false)
     }
  })
 
  const showMore=()=>{
    setvisible((preValue)=>preValue+20);
  }
  return (
    <>
    {
      visibleloading?
      <div className="loading-style" >  <HashLoader color={"#0AA5FF"}  loading={visibleloading} className="" size={100}   aria-label="Loading Spinner"  data-testid="loader"
      /></div>
    :
    <div>
      <section className="searchsection w-100  mt-5  ">

       
        <div className="  pt-2 p-3 d-flex flex-column flex-lg-row align-items-center justify-content-between">

          <div className=" d-flex m-2 w-100">

            <select placeholder="Select Option " onChange={(e)=>onSearhslote(e.target.value)}  className="w-100  mb-xs-3 mb-lg-0 rounded-none" style={{border:"1px solid gray"}}>
                          <option className=""  selected  disabled >
                              Select Slot
                          </option>
                          <option value={"1"}>8:30 to 9:55</option>
                          <option value={"2"}>9:55 to 11:20</option>
                          <option value={"3"}>11:20 to 12:45</option>
                          <option value={"4"}>1:40 to 3:05</option>
                          <option value={"5"}>3:05 to 4:30</option>
                          <option value={"all"}>All</option>
                          
                      </select>


          </div>
           {/* ==================================================== */}
          <div className="m-2 d-flex  w-100 flex-column align-items-center justify-content-between">

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

          <div className="m-2 d-flex w-100 flex-column align-items-center justify-content-between">

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


          <div className="m-2 d-flex w-100 flex-column align-items-center justify-content-between">

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



          {/* ================================================= */}
        </div>

      </section>
      <section className=" mb-2 d-flex   complete-section">
        <div className="container  mb-5">
          <div className="row  d-flex row-cols-3 pt-2  align-items-center justify-content-center mb-5">
            {FilterData.filter(datavaluess => datavaluess.Day == getday && datavaluess.Status==false).slice(0,visible).map((datavalues, id) => {
              return (
                <>
                  <div className="col  columndiv" style={{width:"250px"}} key={id}>
                 
                    <h3 className=" subject mt-3 ">{datavalues.Subjects}</h3>
                    <p className=" teacher mt-3">{datavalues.Teacher}</p>
                    <div className="roombg bg-gray rounded " style={{ padding: "1px 1px" }}>
                      <h2 className="text-center mt-3 fw-bold  room ">
                        {datavalues.Room}
                      </h2>
                    </div>
                    <div className="text-center mt-3 ">
                      <div className="d-sm-flex align-items-center  classdivclassname ">
                        <p className="icons classes">
                          <SiGoogleclassroom />
                        </p>
                        <p className="text-center classess   ">
                          {datavalues.Classess}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="icons">
                          <BiTime />
                        </p>
                        <p className="text-center lecture ">
                          {lecturetime(datavalues.Lecture)}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <Inputbutton key={datavalues._id}
                      lecture={lecturetime(datavalues.Lecture)}
                      day={datavalues.Day}
                      class={datavalues.Classess}
                      subject={datavalues.Subjects}
                      teacher={datavalues.Teacher}            
                      room={datavalues.Room}
                      id={datavalues._id}
                      date={date}
                      visibility={datavalues.Status}
                    />
                  </div>
                </>
              );
            })}
          </div>
            <button className="btn btn-primary rounded mb-5 w-50 mx-auto text-center" style={{display: isShown ? 'block' : 'none'}}  onClick={showMore}>Load More</button>
        </div>
        {modalOpen && <EditModal setOpenModal={modalOpen} datavalue={FilterData} />}
      </section>
      </div>
    }

    </>
  );
};

export default Lectures;
