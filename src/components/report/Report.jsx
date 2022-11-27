import React from "react";
import { useState } from "react";
import { baseurl } from "../../baseurl/baseurl";
import { useEffect } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { GrMail } from "react-icons/gr";

import "./Report.css";

const Report = () => {
  const [inpval, setINP] = useState({
    Name: "",
    Email: "",
    Message: "",
  });

  const setdata = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { Name, Email, Message } = inpval;

    const res = await fetch(baseurl + "/register/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name,
        Email,
        Message,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      alert("Your Feedback sent Successfully");
      console.log("data added");
      setINP({
        Name: "",
        Email: "",
        Message: "",
      });
    }
  };
  const [getaboutusdata, setaboutusdata] = useState([]);

  /*========================================================*/
  const getdataaboutus = async () => {
    const res = await fetch("getdata/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setaboutusdata(data);
      console.log(data);
    }
  };

  useEffect(() => {
    getdataaboutus();
  }, []);
  return (
    <>
      <section className="details">
        <div className="container">
          <h3 className="text-center text-dark text-uppercase ">Contact us</h3>

          <h4 className="text-center text-xl-start my-5">Give feedback </h4>
          <h6 className="text-center text-xl-start mb-2">
            What do you think of this app?
          </h6>
          <h6 className="text-center text-xl-start mb-5">
            Please contact us if you face any issue.
          </h6>

          <div className=" wraper justify-content-between align-items-center d-flex">
            <div className="right">
              <form action="#">
                <h3 className="sectionheading text-dark">Message</h3>
                <div className="formfield row d-flex justify-content-between inputss">
                  <div className=" col-sm d-flex flex-column mb-3 ">
                    <label for="name">
                      Full Name: <span>*</span>
                    </label>
                    <input
                      className="txtfield"
                      type="text"
                      placeholder="Johan"
                      onChange={setdata}
                      value={inpval.Name}
                      name="Name"
                    />
                  </div>
                  <div className="col-sm d-flex flex-column">
                    <label for="name">
                      Email: <span>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Johan"
                      onChange={setdata}
                      name="Email"
                      value={inpval.Email}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column  ">
                  <label for="name">
                    Message: <span>*</span>
                  </label>
                  <textarea
                    name="Message"
                    placeholder="Message"
                    id=""
                    cols="30"
                    value={inpval.Message}
                    rows="5"
                    onChange={setdata}
                  ></textarea>
                </div>

                <a className="d-flex align-items-center " href="#">
                  <button
                    className="btn btn-primary btnprimary mb-5"
                    onClick={addinpdata}
                  >
                    Submit
                  </button>
                </a>
              </form>
            </div>
            <div className="left  ">
              <h3 className="sectionheading text-dark">Our Contact</h3>
              <div className="d-flex align-items-center mb-3">
                <GrMail className="me-5 text-primary" />
                <div className="flex">
                  <h5>Email Address</h5>
                  {getaboutusdata.map((element, id) => {
                    return (
                      <>
                        <p className="m-0 p-0">{element.email}</p>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex align-items-center mb-5">
                <BsFillTelephoneFill className="me-5 text-primary" />
                <div className="flex">
                  <h5>Phone Num</h5>
                  {getaboutusdata.map((element, id) => {
                    return (
                      <>
                        <p className="m-0 p-0">{element.phone}</p>
                      </>
                    );
                  })}
                </div>
              </div>
              <h3 className="sectionheading text-dark">Address</h3>
              {getaboutusdata.map((element, id) => {
                return (
                  <>
                    <p className="m-0 p-0">{element.address}</p>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Report;
