import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
const reminder = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className=" d-flex align-items-center justify-content-center">
          <img src="./assets/images/code.gif" alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default reminder;
