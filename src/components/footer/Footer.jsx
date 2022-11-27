import React from "react";

import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { GrMail } from "react-icons/gr";
import { useState, useEffect } from "react";
import "./Footer.css";
import { baseurl } from "../../baseurl/baseurl";

const Footer = () => {
  const [getaboutusdata, setaboutusdata] = useState([]);

  /*========================================================*/
  const getdataaboutus = async () => {
    const res = await fetch(baseurl+ "getdata/contacts", {
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
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-sm mb-3 mb-lg-0 d-lg-flex flex-column align-items-center align-items-sm-start  d-none d-lg-block ">
              <h3>Quick Links</h3>

              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/report">Contact Us</a>
              <a href="/booking">Bookings</a>
              <a href="/reminder">Reminder</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Term of Use</a>
            </div>

            <div className="col-sm mb-lg-5 mb-lg-0 d-flex flex-column align-items-start align-items-sm-start contact">
              <h3>Contact Us</h3>
              <div className="d-flex text-center align-items-center  mb-2">
                <a className="" href="#">
                  <BsFillTelephoneFill />
                </a>
                {/* {getaboutusdata.map((element, id) => {
                  return (
                    <>
                      <p className="m-0 p-0">+023456789</p>
                    </>
                  );
                })} */}
                <p>+023456789</p>
              </div>
              <div className="d-flex text-center align-items-center mb-2">
                <a className="" href="#">
                  <GrMail />
                </a>
                <p>example@gmail.com</p>
                {/* {getaboutusdata.map((element, id) => {
                  return (
                    <>
                      <p className="m-0 p-0">example@gmail.com</p>
                    </>
                  );
                })} */}
              </div>
              <div className="d-flex text-center align-items-center mb-2">
                <a className="" href="#">
                  <ImLocation2 />
                </a>
                <p>Comsats University Sahiwal</p>
                {/* {getaboutusdata.map((element, id) => {
                  return (
                    <>
                      <p className="m-0 p-0 w-50">"Near the Comsats University Sahiwal"</p>
                    </>
                  );
                })} */}
              </div>
            </div>
            <div className="col-sm mb-5 mb-lg-0 d-lg-flex flex-column align-items-center align-items-sm-start services d-none d-lg-block">
              <h3>Services</h3>
              <p>
                CUI Timetable available on <br />
                google play store.
              </p>
              <img src="./assets/images/playsotre.png" alt="" />
              <img src="./assets/images/logocui.png" alt="" />
            </div>
          </div>

          <div className="row text-center socials">
            <h3>Quick Links</h3>
            <div className="socialicons">
              <a href="#">
                <img src="./assets/images/facebok.png" alt="" />
              </a>
              <a href="#">
                <img src="./assets/images/twitter.png" alt="" />
              </a>
              <a href="#">
                <img src="./assets/images/instagram.png" alt="" />
              </a>
              <a href="#">
                <img src="./assets/images/linkedin.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <footer className="policy fluid-container">
        <div className="container  p-4">
          <div className="policywrapper row ">
            <div className="col-lg align-items-center align-items-lg-start">
              <p className="m-0 p-0 text-lg-start text-center mb-lg-0 mb-3">
                Copyright © 2022 by{" "}
                <span>Comsats University Islamabad Sahiwal Campus</span> All
                Rights Reserved
              </p>
            </div>
            <div className="col-lg text-lg-end text-center ">
              <a
                className=""
                href="https://github.com/codealign"
                target="_blank"
              >
                <p className="develop m-0 p-0  ">Designed by Khalid Shabbir</p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
