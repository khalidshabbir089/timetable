import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Timetable from "../components/timetable/Timetable";

const timetable = () => {
  return (
    <>
      <Navbar />

      <Timetable />
      <Footer />
    </>
  );
};

export default timetable;
