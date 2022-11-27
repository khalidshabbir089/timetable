import { useState, useEffect } from "react";
import "./Timetable.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { baseurl } from "../../baseurl/baseurl";
import { BsArrowLeftShort } from 'react-icons/bs'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HashLoader from "react-spinners/HashLoader";
import {NavLink} from 'react-router-dom'

const Compare = () => {
    const [getuserdata, setUserdata] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [FilterDatateacher, setFilterDatateacher] = useState([]);
    const [value, setvalue] = useState("");
    const [valueteacher, setvalueteacher] = useState("");
    const [getDaydata, setDaydata] = useState("10000");
    const [getDaydatateacher, setDaydatateacher] = useState("10000");
    const [show, setShow] = useState(false);
    const [showteacher, setShowteacher] = useState(false);
    const [getserchsuggestion, setsearchsuggestion] = useState("");
    const [getserchsuggestionteacher, setsearchsuggestionteacher] = useState("");
    const [visibleloading, setvisibleloading] = useState(true)
    const [getDropdownSelected,setDropdwonSelected]=useState("")
    const [getClassValue,setClassValue]=useState("")
    
    
    // ==================================================
    const getdata = async () => {
        const res = await fetch(baseurl + "/getdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
    
        if (res.status === 422 || !data) {
          console.log("error ");
        } else {
          setUserdata(data);
          setvisibleloading(false)
        }
      };
    
      useEffect(() => {
        getdata();
      }, []);
    


// ===================================================================


//====================================================================
const dayFreeSlote=(dayValue)=>{
    const teacherLectues= getuserdata.filter((obj)=>obj.Teacher===getDropdownSelected&& obj.Day===dayValue).map((obj)=>obj.Lecture);
    const classLectures= getuserdata.filter((obj)=>obj.Classess===getClassValue&& obj.Day===dayValue).map((obj)=>obj.Lecture);
  console.log("heres t")
  console.log(teacherLectues)
  console.log("heres C")
  console.log(classLectures)
  const arr1 = ["1", "2", "3", "4", "5"];
//  ====================================================================
console.log("Teacher Free lectures")
  let uniqueteacher1 = arr1.filter((o) => teacherLectues.indexOf(o) === -1);
  let uniqueteacher2 = teacherLectues.filter((o) => arr1.indexOf(o) === -1);
  const uniqueteacher = uniqueteacher1.concat(uniqueteacher2);
  console.log(uniqueteacher);
//   ==================================================================
console.log("Class free lectures")
let uniqueclass1 = arr1.filter((o) => classLectures.indexOf(o) === -1);
  let uniqueclass2 = classLectures.filter((o) => arr1.indexOf(o) === -1);
  const uniqueclass = uniqueclass1.concat(uniqueclass2);
  console.log(uniqueclass);

//   ========================================================
console.log("free")
const output = uniqueclass.filter(function (obj) {
    return uniqueteacher.indexOf(obj) !== -1;
  });
  console.log(output);

  setMapingValues(output)
  return output;

}

// ====================================================================
const [mondaytotal,setmondaytotal]=useState(0);
const [tuesdaytotal,settuesdaytotal]=useState(0)
const [wednesdaytotal,setwednesdaytotal]=useState(0)
const [thursdaytotal,setthursdaytotal]=useState(0)
const [fridaytotal,setfridaytotal]=useState(0)
const [getMapingValues,setMapingValues]=useState([])
  const onSearch = () => {
  
     const m=dayFreeSlote("10000")
  
    const t=dayFreeSlote("1000")
     settuesdaytotal(t.length)
     const w=dayFreeSlote("100")
     setwednesdaytotal(w.length)
     const thurs=dayFreeSlote("10")
     setthursdaytotal(thurs.length)
     const fri=dayFreeSlote("1")
     setfridaytotal(fri.length)
    const resultis=dayFreeSlote("10000");
    setMapingValues(resultis)
    setmondaytotal(resultis.length)
   
  };
  /*=======================================================================================*/
 const [getmapTeachers,setmapTeachers]=useState([])
  const filterfun=(valuep)=>{
    setClassValue(valuep)
 const filterdata=   getuserdata.filter((obj)=>obj.Classess===valuep)

 const unique = filterdata.filter((obj, pos, arr) => {
    return (
      arr.map((mapObj) => mapObj.Teacher).indexOf(obj.Teacher) == pos
    );
   
  });
 
  setmapTeachers(unique)
  }
  
  const searchsuggestion = (text) => {
    setvalue(text);
  filterfun(text)
    if (!text) {
      setShow(false);
      setsearchsuggestion([]);
    } else {
      const matches = getuserdata.filter((obj) => {
        const regex = new RegExp(`${text}`, "gi");
        return obj.Classess.match(regex);
      });
      const unique = matches.filter((obj, pos, arr) => {
        return (
          arr.map((mapObj) => mapObj.Classess).indexOf(obj.Classess) == pos
        );
      });
      setsearchsuggestion(unique);
      setShow(true);
      
    }
  };
//  ===============================Teacher==================================================
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
// ===============================================

  return (
      <>
          <div className='bg-white  rounded-3 mt-5' style={{width:"auto"}}>
              <div className="timetablesearchpage   pt-3 rounded-3  ">
                    
                  <div className="fominputbuttn  d-flex align-items-center  justify-content-center flex-column">
                      <form className="">
                          <input
                              type="text"
                              className="mb-2"
                              onChange={(e) => {

                                  searchsuggestion(e.target.value.toUpperCase());
                              }}
                              value={value}
                              placeholder="FA19-BSE-A "
                          />
                      </form>
                      <div className="suggestion mb-3">
                          <div
                              className="scrolldiv w-auto py-3"
                              style={{ display: show ? "block" : "none" }}
                          >
                              {getserchsuggestion &&
                                  getserchsuggestion.map((data, index) => {
                                      return (
                                          <div className="" id={index}>
                                              <p
                                                  onClick={() => {

                                                      setvalue(data.Classess);
                                                      filterfun(data.Classess)
                                                      setShow((s) => !s);
                                                  }}
                                                  className="dropdown-row"
                                                  key={data.Classess}
                                              >
                                                  {data.Classess.replace(/ /g, "")}
                                              </p>
                                          </div>
                                      );
                                  })}
                          </div>
                      </div>



                      {/* ================================================================= */}

                      <div className="dropdownmenue w-100 mt- ">
                      <select placeholder="Select Option" onChange={(e)=>{setDropdwonSelected(e.target.value)}} className="w-100">
                          <option className=""  selected  disabled >
                              Select Section
                          </option>
                          {
                            getmapTeachers.map((obj,id)=>{
                                return(
                                    <>
                                    <option key={id} value={obj.Teacher}>{obj.Teacher}</option>

                                    </>
                                )
                            })
                          }
                          
                      </select>
                  </div>
                      {/* ================================================ */}
                 
                  <button   className="findnow "
                  onClick={() => onSearch()}
                  type="submit">
                  Find Now
              </button> </div>
              </div>

              
          </div>
           <div className="radio-toolbar-days  text-center mb-2 mt-5 d-flex align-items-center justify-content-center">
                  <div className="  monday">
                      <input
                          type="radio"
                          id="Mondaybutton"
                          name="timebuttons"
                          defaultChecked
                         onClick={(e)=>dayFreeSlote("10000")}
                          value="Monday"
                      />

                      <label for="Mondaybutton" className="monday mb-0 ">
                          Monday
                          <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                  {[...Array(mondaytotal)].map((elem, index) => (
                                      <li key={index}></li>
                                  ))}
                              </ul>
                          </span>
                      </label>
                  </div>
                  <div className="tuesday">
                      <input
                          type="radio"
                          id="tuesdaybutton"
                          name="timebuttons"
                          onClick={(e)=>dayFreeSlote("1000")}
                          value="Tuesday"
                      />
                      <label for="tuesdaybutton" className="tuesday mb-0">
                          Tuesday
                          <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                  {[...Array(tuesdaytotal)].map((elem, index) => (
                                      <li key={index}></li>
                                  ))}
                              </ul>
                          </span>
                      </label>
                  </div>

                  <div className="wednesday">
                      <input
                          type="radio"
                          id="wednesdaybutton"
                          name="timebuttons"
                          onClick={(e)=>dayFreeSlote("100")}
                          value="wednesday"
                      />
                      <label for="wednesdaybutton" className="wednesday mb-0">
                          Wednesday
                          <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                  {[...Array(wednesdaytotal)].map((elem, index) => (
                                      <li key={index}></li>
                                  ))}
                              </ul>
                          </span>
                      </label>
                  </div>
                  <div className="thursday">
                      <input
                          type="radio"
                          id="Thursdaybutton"
                          name="timebuttons"
                          onClick={(e)=>dayFreeSlote("10")}
                          value="10"
                      />
                      <label for="Thursdaybutton" className="thursday mb-0">
                          Thursday
                          <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                  {[...Array(thursdaytotal)].map((elem, index) => (
                                      <li key={index}></li>
                                  ))}
                              </ul>
                          </span>
                      </label>
                  </div>
                  <div className="friday">
                      <input
                          type="radio"
                          id="fridaybutton"
                          name="timebuttons"
                          onClick={(e)=>dayFreeSlote("1")}
                          value="friday"
                      />
                      <label for="fridaybutton" className="friday mb-0">
                          Friday
                          <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                  {[...Array(fridaytotal)].map((elem, index) => (
                                      <li key={index}></li>
                                  ))}
                              </ul>
                          </span>
                      </label>
                  </div>
              </div>

              <div className="container  d-flex align-items-center justify-content-center ">
                  <div className="row  d-flex  p-3    mb-5" style={{maxWidth:"650px"}}>
                  <div className="p-3 rounded-3 text-center" style={{backgroundColor:"#e5e5e5"}}> <p>Makeup / extra Classess availability for <span className="text-primary">{getClassValue}</span> </p></div>

                    {getMapingValues.map((datavalues, id) => {
                   
                      return (
            
                        <>
                          <div className="col-12  columndiv  mt-2 mx-0 text-center"   key={id}>
                            <p className="fw-bold fs-6 " >{lecturetime(datavalues)}</p>
                             <p className="text-success fw-bold">Free Slot</p>
                            <button className="btn btn-primary rounded-3">Book Now</button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  </div>
                 
            

      </>
  )
}

export default Compare