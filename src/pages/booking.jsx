import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Freerooms from '../components/FreeRooms'
const boking = () => {
  return (
    <>
       <Navbar />
      <div className="container">
       <Freerooms/>
      </div>
      <Footer />
    </>
  );
};

export default boking;
