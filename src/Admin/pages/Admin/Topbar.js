import React from 'react'
import { NavLink } from 'react-router-dom'
const Topbar = () => {
  return (
   <>
    <div>
  <nav className="main-header d-flex justify-content-between navbar navbar-expand navbar-white navbar-light fixed-top">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <NavLink to="/Admin/Adminpanel" className="nav-link">Home</NavLink>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
      <NavLink to="/Admin/Contactusit" className="nav-link">Contact</NavLink>
      </li>
    </ul>
    {/* SEARCH FORM */}
    {/* <form className="form-inline ml-3">
      <div className="input-group input-group-sm">
        <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-navbar" type="submit">
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
    </form> */}

          <div width="20%" height="20%" class="me-3 bg-info rounded-circle">
            <img
              src={`/uploads/${"khalid.jpg"}`}
              alt=""
              className="topAvatar rounded-circle " width={"40px"} height={"40px"}
            />


          </div>
  </nav>
</div>
   </>
  )
}

export default Topbar