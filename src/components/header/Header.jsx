import React from 'react';
import "./Header.css";
import {NavLink} from 'react-router-dom'
const Header = () => {
  return (
  <>
<section className="hero d-flex justify-content-center">
    <div className="hero-container">
      <h1>CUI TIMETABLE</h1> 
    </div>

     <section className="menu ">
        <div className="content d-flex align-items-center justify-content-between">
            <div className="itesms text-dark text-center" >
               <NavLink to="/timetable" className="text-dark"> 
               <img src="./assets/images/1.png" alt=""/>
                <p className="m-0 p-0">Timetable</p>
                </NavLink>
          </div>
          <hr />
          <div className="itesms text-dark text-center "  >
            <NavLink to="/rooms" className="text-dark">
              <img src="./assets/images/2.1.png" alt=""/>
            <p className="m-0 p-0">Free Rooms</p>
            </NavLink>
           </div>
          <hr />
          <div className="itesms text-dark text-center" >
            <NavLink to="/datesheet" className="text-dark"> <img src="./assets/images/3.png" alt=""/>
            <p className="m-0 p-0">Datesheet</p></NavLink>
          </div>
 
      </div>
    </section>
      
</section>


  </>
  )
}

export default Header