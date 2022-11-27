import React from "react";
import { NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import {ImProfile} from 'react-icons/im'
import {HiOutlineUserGroup} from 'react-icons/hi'
import {BsJournalBookmarkFill} from 'react-icons/bs'
import {AiOutlineFileProtect} from 'react-icons/ai'
import {SiGoogleclassroom} from 'react-icons/si'
import {MdOutlineSchool} from 'react-icons/md'
import {VscSignIn} from 'react-icons/vsc'

import "./Navbar.css";
const Navbar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <div className="pt-4 pb-4 p-2 " style={{backgroundColor:"#0AA5FF"}}>
    <NavLink className=" logo d-flex align-items-center" to="/">
              <img src="./assets/images/logopng1231.png" alt="logo" />
              <div className="logoname ">
                <h1 className="text-light" >CUI TIMETABLE</h1>
                <p className="text-light" >Comsats University Sahiwal</p>
              </div>
            </NavLink>
           
           
    </div>

    <div>
    <ul className="">
              <li className="list-unstyled">
              <NavLink className="" to="/director">
                <div className="d-flex align-items-center mt-4 ">
                <ImProfile className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 NavLInkclass text-dark">Director Vison</p>
                </div></NavLink>
              </li>
              <li className="list-unstyled">
                <NavLink className="" to="/about">
                <div className="d-flex align-items-center mt-4 ">
                <HiOutlineUserGroup className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 text-decoration-none text-dark">About us</p>
                </div></NavLink>
              </li>
             
              <li className="list-unstyled">
                <NavLink className="" to="/booking">
                <div className="d-flex align-items-center mt-4 ">
                <BsJournalBookmarkFill className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 text-decoration-none text-dark">Booking</p>
                </div></NavLink>
              </li>
              <li className="list-unstyled">
                <NavLink className="" to="/report">
                <div className="d-flex align-items-center mt-4 ">
                <AiOutlineFileProtect className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 text-decoration-none text-dark">FeedBack / Report</p>
                </div></NavLink>
              </li>
              <li className="list-unstyled">
                <a className="" href="https://swl-cms.comsats.edu.pk:8082/" target={"_blank"}>
                <div className="d-flex align-items-center mt-4 ">
                <SiGoogleclassroom className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 text-decoration-none text-dark">Student Portal</p>
                </div></a>
              </li>
              <li className="list-unstyled">
                <a className="" href="https://faculty.comsats.edu.pk/Home/login?returnUrl=https://faculty.comsats.edu.pk/" target={"_blank"}>
                <div className="d-flex align-items-center mt-4 ">
                <MdOutlineSchool className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 text-decoration-none text-dark">Teacher Portal</p>
                </div></a>
              </li>
             
              <li className="list-unstyled">
                <NavLink className="" to="/reminder">
                <div className="d-flex align-items-center mt-4 ">
                <VscSignIn className="me-3 "style={{color:"#0AA5FF"}}/>
                <p className="m-0 p-0 text-decoration-none text-dark">Sign In</p>
                </div></NavLink>
              </li>
             
            </ul>
    </div>
   
   
    </Box>
  );
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  fluid-containers navbackg">
        <div className="container ">
          <div className="name">
            <NavLink className=" logo d-flex align-items-center" to="/">
              <img src="./assets/images/logopng1231.png" alt="logo" />
              <div className="logoname ">
                <h1>CUI TIMETABLE</h1>
                <p>Comsats University Sahiwal</p>
              </div>
            </NavLink>
          </div>
         
{/* ============================================================================ */}

<div>
      {['left',].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button  className="navbar-toggler text-light m-0 p-0"
            type="button"
  
           onClick={toggleDrawer(anchor, true)}><MenuIcon/></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
 {/*=================================================================================  */}
          <div
            className=" collapse navbar-collapse nav-links justify-content-end "
            id=""
          >
            <ul className="navbar-nav mr-auto mb-5 mb-lg-0">
              <li className="nav-item mt-5 mt-lg-0">
                <NavLink
                  className="navbar_items  "
                  aria-current="page"
                  to="/director"
                >
                  Director Vision
                </NavLink>
              </li>
              <li className="nav-item mt-3 mt-lg-0">
                <NavLink
                  className="navbar_items  "
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item mt-3 mt-lg-0">
                <NavLink
                  className="navbar_items  "
                  aria-current="page"
                  to="/booking"
                >
                  Bookings
                </NavLink>
              </li>

              <li className="nav-item mt-3 mt-lg-0">
                <NavLink
                  className="navbar_items  "
                  aria-current="page"
                  to="/report"
                >
                  Feedback
                </NavLink>
              </li>
              <li className="nav-item mt-3 mt-lg-0">
                <NavLink
                  className="navbar_items  "
                  aria-current="page"
                  to="/reminder"
                >
                  Sign In
                </NavLink>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              type="button"
              className="btns btns-primary textb"
            >
              Sign In
            </button>
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content bg-primary">
                  <div class="modal-header">
                    <h5 class="modal-title text-light" id="staticBackdropLabel">
                      Sign In
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <a
                      className="text-light"
                      target="blank"
                      href="https://swl-cms.comsats.edu.pk:8082/"
                    >
                      Student
                    </a>
                  </div>
                  <div class="modal-body">
                    <a
                      className="text-light"
                      target="blank"
                      href="https://faculty.comsats.edu.pk/Home/login?returnUrl=https://faculty.comsats.edu.pk/"
                    >
                      Teacher
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
