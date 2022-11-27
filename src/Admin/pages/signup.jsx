import React from "react";
import Signup from "../components/signup/Signupp";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";

const signup = () => {
  return (
    <>
      <div className=" d-flex ">
        <Sidebar />
        <div className="container m-0 p-0">
          <Topbar data={"Register"} />
          <Signup />
        </div>
      </div>
    </>
  );
};

export default signup;
