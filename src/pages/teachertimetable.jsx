import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Teacher from "../components/teachertimetable/Teacher";
const teachertimetable = () => {
  return (
    <>
      <Navbar />

      <Teacher />
      <Footer />
    </>
  );
};

export default teachertimetable;
