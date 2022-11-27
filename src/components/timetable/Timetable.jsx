import React from "react";
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
import Compare from './Compare'
function TabPanel(props) {
  const { children, valuee, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={valuee !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {valuee === index && (
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
  valuee: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Timetable = () => {
  /*===========================Tabs=========================================*/
  const [valuee, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // =====================================================

  const [getuserdata, setUserdata] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [FilterDatateacher, setFilterDatateacher] = useState([]);
  const [value, setvalue] = useState("");
  const [valueteacher, setvalueteacher] = useState("");
  const [getDaydata, setDaydata] = useState("10000");
  const [getD1, setD1] = useState("10001");
  const [getD2, setD2] = useState("10010");
  const [getD3, setD3] = useState("10100");
  const [getD4, setD4] = useState("11000");
  
  const [getDaydatateacher, setDaydatateacher] = useState("10000");

  const [show, setShow] = useState(false);
  const [showteacher, setShowteacher] = useState(false);
  const [getserchsuggestion, setsearchsuggestion] = useState("");
  const [getserchsuggestionteacher, setsearchsuggestionteacher] = useState("");
  const [visibleloading, setvisibleloading] = useState(true)


  // ===============================================



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

  /*=================================================================================*/
  const onSearch = (valueprop) => {

    if (valueprop === "") {
    } else {
      const filterdatav = getuserdata.filter(
        (datavalues) => datavalues.Classess == valueprop.trim()
      );
      setFilterData(filterdatav);

    }
  };
  /*=======================================================================================*/
  const searchsuggestion = (text) => {
    setvalue(text);
  
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
      console.log(unique);
    }
  };
//  ===============================Teacher==================================================

  /*====================================================================================*/
  const onSearchteacher = (valueprop) => {
 
    if (valueprop === "") {
    } else {
      const filterdatav = getuserdata.filter(
        (datavalues) => datavalues.Teacher == valueprop.trim()
      );
      setFilterDatateacher(filterdatav);

    }
  };
  // 

  // ========================================================================c===
  const searchsuggestionteacher = (text) => {
    setvalueteacher(text);
    if (!text) {
      setShowteacher(false);
      setsearchsuggestionteacher([]);
    } else {
      const matches = getuserdata.filter((obj) => {
        const regex = new RegExp(`${text}`, "gi");
        return obj.Teacher.match(regex);
      });
      const unique = matches.filter((obj, pos, arr) => {
        return (
          arr.map((mapObj) => mapObj.Teacher).indexOf(obj.Teacher) == pos
        );
      });
      setsearchsuggestionteacher(unique);
      setShowteacher(true);
   
    }
  };
  /*====================================================================================*/

  const lecturetime = (slot) => {
    if (slot === "1") {
      return "8:30 AM     to  9:55 AM";
    } else if (slot === "2") {
      return "9:55 AM    to  11:20 AM";
    } else if (slot === "3") {
      return "11:20 AM    to  12:45 PM";
    } else if (slot === "4") {
      return "01:40 PM    to  03:05 PM";
    } else if (slot === "5") {
      return "03:05 AM    to  04:30 AM";
    }
  };
  /*=====================================================================================*/

  const mondaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "10000" ||datavalues.Day ==="10001"||datavalues.Day ==="10010"||datavalues.Day ==="10100"||datavalues.Day ==="11000"
  ).length;
  const tuesdaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "1000"||datavalues.Day ==="1001"||datavalues.Day ==="1010"||datavalues.Day ==="1100"||datavalues.Day ==="11000"
  ).length;
  const wednesdaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "100"||datavalues.Day ==="110"||datavalues.Day ==="101"||datavalues.Day ==="1100"||datavalues.Day ==="10100"
  ).length;
  const thursdaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "10"||datavalues.Day ==="11"||datavalues.Day ==="110"||datavalues.Day ==="1010"||datavalues.Day ==="10010"
  ).length;
  const fridaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "1"||datavalues.Day ==="11"||datavalues.Day ==="101"||datavalues.Day ==="1001"||datavalues.Day ==="10001"
  ).length;

  /*====================================================================================*/
  const mondaytotalteacher = FilterDatateacher.filter(
    (datavalues) => datavalues.Day === "10000"
  ).length;
  const tuesdaytotalteacher = FilterDatateacher.filter(
    (datavalues) => datavalues.Day === "1000"
  ).length;
  const wednesdaytotalteacher = FilterDatateacher.filter(
    (datavalues) => datavalues.Day === "100"
  ).length;
  const thursdaytotalteacher = FilterDatateacher.filter(
    (datavalues) => datavalues.Day === "10"
  ).length;
  const fridaytotalteacher = FilterDatateacher.filter(
    (datavalues) => datavalues.Day === "1"
  ).length;


// =========================================================


const dayfunction_is=(d1,d2,d3,d4,d5)=>{

  setDaydata(d1)
  setD1(d2)
  setD2(d3)
  setD3(d4)
  setD4(d5)

}




  /***********************************************************************************8 */
  return (
    <>
      {
        visibleloading ?
          <div className="loading-style" >  <HashLoader color={"#0AA5FF"} loading={visibleloading} className="" size={100} aria-label="Loading Spinner" data-testid="loader"
          /></div>
          : <div>
            <div className="container  mt-3">
              <div className="row d-flex align-items-center jstify-content-between">
                <div className="col">
                  <NavLink to="/">   <button className="text-dark btn shadow-none"><BsArrowLeftShort className="fs-2" /></button>
               </NavLink>
               
                </div>
                <div className="col text-center">
                  <h3 style={{ color: "#064BAF" }}>TimeTable</h3>
                </div>
                <div className="col text-end">
                  <NavLink to="/fulltimetable">
                  <button className="text-dark btn shadow-none"><AiOutlineSearch className="fs-3" /></button>
                  </NavLink>
                </div>
              </div>

            </div>
            <div className="container mt-5">
              <Box className="m-0 p-0" sx={{ width: '100%' }}>
                <Box className="m-0 p-0 d-flex align-items-center justify-content-center" sx={{ borderBottom: 1, borderColor: 'divider', width: "auto" }} >
                  <Tabs className="m-0 p-0" value={valuee} onChange={handleChange} aria-label="basic tabs example">
                    <Tab className="m-0 mx-lg-4 p-0" label="Student" {...a11yProps(0)} />
                    <Tab className="m-0 mx-lg-4 p-0" label="Teacher" {...a11yProps(1)} />
                    <Tab className="m-0 mx-lg-4 p-0" label="Compare" {...a11yProps(2)} />
                  </Tabs>
                </Box >
                <TabPanel className="p-0 d-flex align-items-centr justify-content-center" valuee={valuee} index={0}>
                  {/*==============================================================  */}
                 
                  <section className="searchsection p-0 ">
                    <div className="container mt-3 ">

                      <div className="timetablesearchpage   ">

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
                          <div className="suggestion">
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
                          <button
                            className="findnow"
                            onClick={() => onSearch(value)}
                            type="submit"
                          >
                            Find Now
                          </button>
                        </div>
                      </div>

                      <div className="radio-toolbar-days  text-center mb-2 mt-5 d-flex align-items-center justify-content-center">
                        <div className="  monday">
                          <input
                            type="radio"
                            id="Mondaybutton"
                            name="timebuttons"
                            defaultChecked
                            onClick={() => {
                             dayfunction_is("10000","10001","10010","10100","11000")
                              
                            }}
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
                            onClick={() => {
                              dayfunction_is("1000","1001","1010","1100","11000")
                               
                             }}
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
                            onClick={() => {
                              dayfunction_is("100","110","101","1100","10100")
                            }}
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
                            onClick={() => {
                              dayfunction_is("10","11","110","1010","10010")
                            }}
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
                            onClick={() => {
                              dayfunction_is("1","11","101","1001","10001")
                            }}
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
                    </div>
                    {/* ================================================================================ */}
                  </section>
                  <div className="container  d-flex align-items-center justify-content-center ">
                  <div className="row  d-flex  p-3    mb-5" style={{maxWidth:"650px"}}>
                    {FilterData.filter(
                      (datavalues) => datavalues.Day === getDaydata||datavalues.Day ===getD1||datavalues.Day ===getD2||datavalues.Day ===getD3||datavalues.Day ===getD4
                    ).map((datavalues, id) => {
                      return (
                        <>
                          <div className="col-12  columndiv  mt-2 mx-0 "   key={id}>

                            <h3 className=" subject mt-3 ">{datavalues.Subjects}</h3>
                            <p className=" teacher mt-3">{datavalues.Teacher}</p>
                            <div className="roombg bg-gray rounded " style={{ padding: "1px 1px" }}>
                              <h2 className="text-center mt-3 fw-bold text-light room ">
                                {datavalues.Room}
                              </h2>
                            </div>
                            <div className="text-center mt-3 ">
                              <div className="d-sm-flex align-items-center  classdivclassname ">
                                <p className="icons classes">
                                  <SiGoogleclassroom />
                                </p>
                                <p className="text-center classess m   ">
                                  {datavalues.Classess}
                                </p>
                              </div>
                              <div className="d-flex align-items-center">
                                <p className="icons me-2">
                                  <BiTime />
                                </p>
                                <p className="text-center lecture  m-0  ">
                                  {lecturetime(datavalues.Lecture)}
                                </p>
                              </div>
                            </div>

                          </div>
                        </>
                      );
                    })}
                  </div>
                  </div>
                 

                </TabPanel>
{/* ======================================================================= */}
{/* ===================================================== */}
                {/*=======================================  */}
                <TabPanel valuee={valuee} index={1}>
                <section className="searchsection ">
                    <div className="container mt-3 ">

                      <div className="timetablesearchpage   ">

                        <div className="fominputbuttn d-flex align-items-center  justify-content-center flex-column">
                          <form className="">
                            <input
                              type="text"
                              className="mb-2"
                              onChange={(e) => {

                                searchsuggestionteacher(e.target.value.toUpperCase());
                              }}
                              value={valueteacher}
                              placeholder="Teacher Name "
                            />
                          </form>
                          <div className="suggestion">
                            <div
                              className="scrolldiv w-auto py-3"
                              style={{ display: showteacher ? "block" : "none" }}
                            >
                              {getserchsuggestionteacher &&
                                getserchsuggestionteacher.map((data, index) => {
                                  return (
                                    <div className="" id={index}>
                                      <p
                                        onClick={() => {

                                          setvalueteacher(data.Teacher);
                                          setShowteacher((s) => !s);
                                        }}
                                        className="dropdown-row"
                                        key={data.Teacher}
                                      >
                                        {data.Teacher.replace(/ /g, "")}
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>



                          {/* ================================================================= */}
                          <button
                            className="findnow"
                            onClick={() => onSearchteacher(valueteacher)}
                            type="submit"
                          >
                            Find Now
                          </button>
                        </div>
                      </div>

                      <div className="radio-toolbar-days text-center mb-2 mt-5 d-flex align-items-center justify-content-center">
                        <div className="  monday">
                          <input
                            type="radio"
                            id="Mondaybutton"
                            name="timebuttons"
                            defaultChecked
                            onClick={() => {
                              setDaydatateacher("10000");
                            }}
                            value="Monday"
                          />

                          <label for="Mondaybutton" className="monday mb-0 ">
                            Monday
                            <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                {[...Array(mondaytotalteacher)].map((elem, index) => (
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
                            onClick={() => {
                              setDaydatateacher("1000");
                            }}
                            value="Tuesday"
                          />
                          <label for="tuesdaybutton" className="tuesday mb-0">
                            Tuesday
                            <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                {[...Array(tuesdaytotalteacher)].map((elem, index) => (
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
                            onClick={() => {
                              setDaydatateacher("100");
                            }}
                            value="wednesday"
                          />
                          <label for="wednesdaybutton" className="wednesday mb-0">
                            Wednesday
                            <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                {[...Array(wednesdaytotalteacher)].map((elem, index) => (
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
                            onClick={() => {
                              setDaydatateacher("10");
                            }}
                            value="10"
                          />
                          <label for="Thursdaybutton" className="thursday mb-0">
                            Thursday
                            <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                {[...Array(thursdaytotalteacher)].map((elem, index) => (
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
                            onClick={() => {
                              setDaydatateacher("1");
                            }}
                            value="friday"
                          />
                          <label for="fridaybutton" className="friday mb-0">
                            Friday
                            <span className=" d-flex align-item-center justify-content-center">
                              <ul className="d-flex li ">
                                {[...Array(fridaytotalteacher)].map((elem, index) => (
                                  <li key={index}></li>
                                ))}
                              </ul>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* ================================================================================ */}
                  </section>
                 <div className="d-flex align-items-center mb-5 pt-3 justify-content-center">
                  <div className="row  d-flex align-items-center " style={{maxWidth:"650px"}}>
                    {FilterDatateacher.filter(
                      (datavalues) => datavalues.Day === getDaydata||datavalues.Day ===getD1||datavalues.Day ===getD2||datavalues.Day ===getD3||datavalues.Day ===getD4
                    ).map((datavalues, id) => {
                      return (
                        <>
                          <div className="col-12  columndiv  mt-2 mx-0 "  key={id}>

                            <h3 className=" subject mt-3 ">{datavalues.Subjects}</h3>
                            <p className=" teacher mt-3">{datavalues.Teacher}</p>
                            <div className="roombg bg-gray rounded " style={{ padding: "1px 1px" }}>
                              <h2 className="text-center mt-3 fw-bold text-light room ">
                                {datavalues.Room}
                              </h2>
                            </div>
                            <div className="text-center mt-3 ">
                              <div className="d-sm-flex align-items-center  classdivclassname ">
                                <p className="icons classes">
                                  <SiGoogleclassroom />
                                </p>
                                <p className="text-center classess m   ">
                                  {datavalues.Classess}
                                </p>
                              </div>
                              <div className="d-flex align-items-center">
                                <p className="icons me-2">
                                  <BiTime />
                                </p>
                                <p className="text-center lecture  m-0  ">
                                  {lecturetime(datavalues.Lecture)}
                                </p>
                              </div>
                            </div>

                          </div>
                        </>
                      );
                    })}
                  </div>
                  </div>
               
                </TabPanel>


                {/* ======================================================= */}
                <TabPanel valuee={valuee} index={2}>
                 <Compare/>
                </TabPanel>
              </Box>
            </div>

          </div>
      }
    </>

  );
};

export default Timetable;
