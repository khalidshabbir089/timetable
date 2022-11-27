import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Teacher.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaGraduationCap } from "react-icons/fa";
import { baseurl } from "../../baseurl/baseurl";
const Timetable = () => {
  /*====================================================================*/

  const [getuserdata, setUserdata] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [value, setvalue] = useState("");
  const [getDaydata, setDaydata] = useState("10000");

  const [show, setShow] = useState(true);
  const [getserchsuggestion, setsearchsuggestion] = useState("");

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
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  /*=================================================================================*/

  const textInputclassname = React.createRef();

  const onChange = (event) => {
    const classessname = event.target.value.toUpperCase();
  };

  const onSearch = (searchTerm) => {
    if (value === "") {
    } else {
      const filterdatav = getuserdata.filter(
        (datavalues) => datavalues.Teacher == value.trim()
      );
      setFilterData(filterdatav);
    }
  };
  /*=======================================================================================*/
  const searchsuggestion = (text) => {
    setvalue(text);
    if (!text) {
      setsearchsuggestion([]);
    } else {
      const matches = getuserdata.filter((obj) => {
        const regex = new RegExp(`${text}`, "gi");
        return obj.Teacher.match(regex);
      });
      const unique = matches.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj.Teacher).indexOf(obj.Teacher) == pos;
      });
      setsearchsuggestion(unique);
    }
  };

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
  /*=====================================================================================*/

  const mondaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "10000"
  ).length;
  const tuesdaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "1000"
  ).length;
  const wednesdaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "100"
  ).length;
  const thursdaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "10"
  ).length;
  const fridaytotal = FilterData.filter(
    (datavalues) => datavalues.Day === "1"
  ).length;

  /*====================================================================================*/

  /***********************************************************************************8 */
  return (
    <>
      <section className="searchsection">
        <div className="container mt-3 ">
          <div class=" ">
            <NavLink to="/fulltimetable" className="text-dark float-end">
              {" "}
              <AiOutlineSearch />
            </NavLink>

            <h1 class=" mr-5 text-center">Timetable</h1>
          </div>

          <div className="timetablesearchpage   ">
            <div className="studentteachertimetable text-center mb-5 mt-5">
              <input
                className=""
                type="radio"
                id="Student"
                name="studentteachertimetable"
                value="Student"
              />
              <label for="Student">
                {" "}
                <NavLink className="navbar_items" to="/timetable">
                  Student
                </NavLink>
              </label>

              <input
                type="radio"
                id="Teacher"
                name="studentteachertimetable"
                value="Tuesday"
                defaultChecked
              />
              <label for="Teacher">
                {" "}
                <NavLink className="navbar_items" to="/teacher">
                  Teacher
                </NavLink>
              </label>

              <input
                type="radio"
                id="Caompare"
                name="studentteachertimetable"
                value="wednesday"
              />
              <label for="Caompare">
                {" "}
                <NavLink className="navbar_items" to="/compare">
                  Compare
                </NavLink>
              </label>
            </div>
            <div className="fominputbuttn d-flex align-items-center  justify-content-center flex-column">
              <form className="">
                <input
                  type="text"
                  onChange={(e) => {
                    setShow(true);
                    searchsuggestion(e.target.value.toUpperCase());
                  }}
                  value={value}
                  placeholder="Enter your name "
                />
              </form>
              <div className="suggestion">
                <div
                  className="scrolldiv w-auto"
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
                            {data.Teacher}
                          </p>
                        </>
                      );
                    })}
                </div>
              </div>

              <button
                className="findnow"
                onClick={() => onSearch(value)}
                type="submit"
              >
                Find Now
              </button>
            </div>
          </div>

          <div></div>

          <div className="radio-toolbar-days text-center mb-2 mt-5 d-flex align-items-center justify-content-center">
            <div className="  monday">
              <input
                type="radio"
                id="Mondaybutton"
                name="timebuttons"
                defaultChecked
                onClick={() => {
                  setDaydata("10000");
                }}
                value="Monday"
              />

              <label for="Mondaybutton" className="monday ">
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
                  setDaydata("1000");
                }}
                value="Tuesday"
              />
              <label for="tuesdaybutton" className="tuesday">
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
                  setDaydata("100");
                }}
                value="wednesday"
              />
              <label for="wednesdaybutton" className="wednesday">
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
                  setDaydata("10");
                }}
                value="10"
              />
              <label for="Thursdaybutton" className="thursday">
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
                  setDaydata("1");
                }}
                value="friday"
              />
              <label for="fridaybutton" className="friday">
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
      </section>
      <section className="timetablediv">
        <div className="container">
          <div className="row  d-flex row-cols-2  align-items-center justify-content-center mb-5">
            {FilterData.filter(
              (datavalues) => datavalues.Day === getDaydata
            ).map((datavalues, id) => {
              return (
                <>
                  <div className="col-12 ">
                    <h3 className="  subject">{datavalues.Subjects}</h3>
                    <div className="d-flex align-items-center">
                      <p className="icons classes ">
                        <SiGoogleclassroom />
                      </p>
                      <p className="  classess">{datavalues.Classess}</p>
                    </div>

                    <h2 className="text-center mt-3 m-0 room">
                      {datavalues.Room}
                    </h2>
                    <div className="d-flex  flex-row aligin-items-center  justify-content-between mt-3 ">
                      <div className="d-sm-flex  align-items-center  classdivclassname d-none d-sm-block">
                        <p className="m-0 mb-1">
                          <FaGraduationCap />
                        </p>
                        <p className="text-center classess  mr-5">
                          {datavalues.Teacher}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="icons">
                          <BiTime />
                        </p>
                        <p className="text-center lecture">
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
      </section>
    </>
  );
};

export default Timetable;
