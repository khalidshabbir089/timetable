import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Datesheet.css";
import { BiTime } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { baseurl } from "../../baseurl/baseurl";
const Datesheet = () => {
  /*====================================================================*/

  const [getuserdata, setUserdata] = useState([]);
  const [FilterData, setFilterData] = useState([]);
  const [value, setvalue] = useState("");
  const [getDaydata, setDaydata] = useState("Monday");

  const [show, setShow] = useState(true);
  const [getserchsuggestion, setsearchsuggestion] = useState("");

  const getdata = async () => {
    const res = await fetch(baseurl + "/datesheet/getdata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
     console.log("this is response")
     console.log(data)
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
        (datavalues) => datavalues.Section == value.trim()
      );
      setFilterData(filterdatav);
      console.log(value);
    }
  };
  /*=======================================================================================*/
  const searchsuggestion = (text) => {
   
    setvalue(text);
    if (!text) {
      setsearchsuggestion([]);
    } else {
      try {
        const matches = FilterData.filter((obj) => {
          return obj.Section.match(text);
    
        });
        console.log("this is match")
        console.log(matches)
        const unique = matches.filter((obj, pos, arr) => {
          return (
            arr.map((mapObj) => mapObj.Section).indexOf(obj. Section) == pos
          );
        });
        setsearchsuggestion(unique);
        console.log(unique);
      } catch (error) {
        console.log("catch block error");
      }
    }
  };

  /*====================================================================================*/

  /*====================================================================================*/

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
    (datavalues) => datavalues.Dayname === "Monday"
  ).length;
  const tuesdaytotal = FilterData.filter(
    (datavalues) => datavalues.Dayname === "Tuesday"
  ).length;
  const wednesdaytotal = FilterData.filter(
    (datavalues) => datavalues.Dayname === "Wednesday"
  ).length;
  const thursdaytotal = FilterData.filter(
    (datavalues) => datavalues.Dayname === "Thursday"
  ).length;
  const fridaytotal = FilterData.filter(
    (datavalues) => datavalues.Dayname === "Friday"
  ).length;

  /*===============================================*/
  return (
    <>
      <section className="searchsection">
        <div className="container mt-3 ">
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            SP22 Final date sheet available for your convenience. Kindly cross
            verify your exam or duty time with original file received from exam
            department. Thank you.
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
          <div class=" ">
            <h1 class=" mr-5 text-center">Datesheet</h1>
          </div>

          <div className="timetablesearchpage   ">
            <div className="studentteachertimetable text-center mb-5 mt-5">
              <input
                className=""
                type="radio"
                id="Student"
                name="studentteachertimetable"
                defaultChecked
                value="Student"
              />
              <label for="Student">
                {" "}
                <NavLink className="navbar_items" to="/datesheet">
                  Student
                </NavLink>
              </label>

              <input
                type="radio"
                id="Teacher"
                name="studentteachertimetable"
                value="Tuesday"
              />
              <label for="Teacher">
                {" "}
                <NavLink className="navbar_items" to="/teacherdatesheet">
                  Teacher
                </NavLink>
              </label>
            </div>
            <div className="fominputbuttn d-flex align-items-center  justify-content-center flex-column">
              <form className="">
                <input
                  type="text"
                  className="mb-2"
                  onChange={(e) => {
                    setShow(true);
                    searchsuggestion(e.target.value.toUpperCase());
                  }}
                  value={value}
                  placeholder="FA19-BSE-A "
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
                              setvalue(data.Section);
                              setShow((s) => !s);
                            }}
                            className="dropdown-row"
                            key={data.Section}
                          >
                            {data.Section.replace(/ /g, "")}
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
                  setDaydata("Monday");
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
                  setDaydata("Tuesday");
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
                  setDaydata("Wednesday");
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
                  setDaydata("Thursday");
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
                  setDaydata("Friday");
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
      <section className="datesheet">
        <div className="container">
          <div className="row  d-flex row-cols-2  align-items-center justify-content-center mb-5">
            {FilterData.filter((obj) => obj.Dayname === getDaydata).map(
              (datavalues, id) => {
                return (
                  <>
                    <div className="col-12 ">
                      <div className="d-flex  flex-row aligin-items-center  justify-content-between  ">
                        <div className="d-sm-flex align-items-center  classdivclassname d-none d-sm-block">
                          <p className="icons classes">
                            <IoLocationOutline />
                          </p>
                          <p className="text-center classess ">
                            {datavalues.Room}
                          </p>
                        </div>

                        <div className="d-sm-flex align-items-center  classdivclassname d-none d-sm-block">
                          <p className="icons classes">
                            <SiGoogleclassroom />
                          </p>
                          <p className="text-center classess ">
                            {datavalues.Section}
                          </p>
                        </div>
                      </div>

                      <h2 className="text-center mt-5 m-0 room">
                        {datavalues.Subjects}
                      </h2>
                      <div className="d-flex  flex-row aligin-items-center  justify-content-between mt-5 ">
                        <div className="d-flex align-items-center">
                          <p className="icons">
                            <BsCalendarDate />
                          </p>
                          <p className="text-center lecture">
                            {datavalues.Date}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="icons">
                            <BiTime />
                          </p>
                          <p className="text-center lecture">
                            {datavalues.Time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Datesheet;
