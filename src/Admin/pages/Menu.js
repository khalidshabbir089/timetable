import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillSetting} from 'react-icons/ai';
import {IoMdLogOut} from 'react-icons/io'
import {BsArrowLeftCircleFill} from 'react-icons/bs'




const Menu = () => {
  const logout = () => {
    alert("Logout");
    window.location.href = "/Admin/";
    window.localStorage.clear();
    window.localStorage.removeItem("isAuthenticated");
  };
  return (
    <div className='fixed-top'>
  <aside className="  main-sidebar sidebar-dark-primary elevation-4 ">
    {/* Brand Logo */}
    <a className="nav-link text-end text-light d-lg-none  " data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
  
    <div className="logo d-flex align-item-center m-3 ">
      <a className='d-flex  align-items-center' href='/admin/main'>
            <img src="../assets/images/logopng1231.png" style={{width:"50px",height:"50px"}} alt="logo" />
           <h1 className='text-light text-uppercase fs-3 ms-2 fw-bold'>comsats</h1>
           </a>
          </div>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
    
      {/* Sidebar Menu */}
      <nav className="mt-3">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        
          <li className="nav-item has-treeview  ">
            <NavLink to="/Admin/Adminpanel" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt" />
              <p>
                Dashboard
              
              </p>
            </NavLink>
           
          </li>
          <li className="nav-item">
            <NavLink to="/Admin/Reports" className="nav-link">
              <i className="nav-icon fas fa-th" />
              <p>
                Report
              
              </p>
            </NavLink>
          </li>
        
      
       
          <li className="nav-item has-treeview">
            <NavLink to="/Admin/Setting" className="nav-link">
            <AiFillSetting className='nav-icon'/>
              <p>
                Setting
               
              </p>
            </NavLink>
           
          </li>
          <li className="nav-item has-treeview" onClick={logout}>
            <NavLink to="/Admin/logout"  className="nav-link">
            <IoMdLogOut className='nav-icon'/>
              <p >
                Logout
               
              </p>
            </NavLink>
           
          </li>
        
          <li className="nav-header">Support</li>
      
          <li className="nav-item has-treeview">
            <NavLink to="/Admin/Contactusit" className="nav-link">
              <i className="nav-icon fas fa-book" />
              <p>
               Contact us
             
              </p>
            </NavLink>
       
          </li>
        
          
       
        </ul>
      </nav>
      
      {/* <a className="text-center" data-widget="pushmenu" href="#">
         <button className='btn  text-light rounded w-50 text-center bold' style={{marginTop:"90%"}}> <BsFillArrowRightSquareFill className='' style={{fontSize:"20px"}}/> </button></a>
   */}
    </div>
   
    {/* /.sidebar */}
  </aside>
</div>
  )
}

export default Menu