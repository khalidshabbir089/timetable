import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { AiFillSetting} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs'
import {GoReport} from 'react-icons/go'
import {ImProfile} from 'react-icons/im'
const Appbar = () => {
  
  return (
    <div className='fixed-top  '>
    <aside className="   main-sidebar  sidebar-dark-primary elevation-4 ">
      {/* Brand Logo */}
      <a className="nav-link text-end text-light d-lg-none  " data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
     
      <div className="logo d-flex align-item-center m-3 ">
      <a className='d-flex  align-items-center' href='Admin/Adminpanel'>
            <img src="../assets/images/logopng1231.png" style={{width:"50px",height:"50px"}} alt="logo" />
           <h1 className='text-light text-uppercase fs-3 ms-2 fw-bold'>comsats</h1>
           </a>
          
      
          </div>
       
    
      {/* Sidebar */}
      <div className="overflow-auto sidebar">
        {/* Sidebar user panel (optional) */}
      
        {/* Sidebar Menu */}
        <nav className="mt-3">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
            <li className="nav-item has-treeview  ">
              <NavLink to="/admin/main" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>
                  Dashboard
                
                </p>
              </NavLink>
             
            </li>
            <li className="nav-item has-treeview">
            <NavLink to="/admin/about-us" className="nav-link">
              <BsFillPersonFill className='nav-icon mb-2' />
              <p  >
                About us
               
              </p>
            </NavLink>
           
          </li>
         
          <li className="nav-item has-treeview">
            <NavLink to="/admin/director" className="nav-link">
              <ImProfile className="nav-icon mb-2" />
              <p>
               Director Vision
                
              </p>
            </NavLink>
           
          </li>
          <li className="nav-item has-treeview">
            <NavLink to="/admin/files-uploding" className="nav-link">
              <i className="nav-icon fas fa-edit" />
              <p>
                File
               
              </p>
            </NavLink>
           
          </li>
          <li className="nav-item has-treeview">
            <NavLink to="/admin/feedback" className="nav-link">
            <GoReport className="nav-icon" />
              
              <p>
              Feedback
                
              </p>
            </NavLink>
           
          </li>
          <li className="nav-item has-treeview">
            <NavLink to="/admin/monitering_users_settings" className="nav-link">
            <AiFillSetting className='nav-icon'/>
              <p>
                Monitering Users
               
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

export default Appbar