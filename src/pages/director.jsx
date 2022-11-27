import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Director from "../components/director/Director";
const director = () => {
  return (
    <>
      <Navbar />
      <Director />
      <Footer />
    </>
  );
};

export default director;
