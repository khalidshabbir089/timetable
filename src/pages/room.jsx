import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FreeRooms from "../components/FreeRooms"
const room = () => {
  return (
    <>
      <Navbar />
      <div className="container">
       <FreeRooms/>
      </div>
      <Footer />
    </>
  );
};

export default room;
