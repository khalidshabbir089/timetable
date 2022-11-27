import React, { useState } from 'react'

const Footer = () => {
  const [date,setdate]=useState("")
  const getdate = () => {
    var today = new Date(),
      date = today.getDate()+"/" +(today.getMonth() + 1)+"/"+ today.getFullYear();
    
    return date;
    
  };


  return (
    <footer className="main-footer  fixed-bottom bg-light d-none d-lg-block  d-flex  flex-lg-row  text-center ">
     
     <a
                className=""
                href="https://github.com/khalidshabbir"
                target="_blank"
              >
                <p className=" m-0 p-0">Designed by Khalid Shabbir</p>
              </a>
      
    </footer>
  )
}

export default Footer