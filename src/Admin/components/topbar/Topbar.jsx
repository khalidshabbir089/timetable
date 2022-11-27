import React from "react";
import "./topbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Language, Settings } from "@material-ui/icons";
import { RiLogoutCircleLine } from "react-icons/ri";
import { baseurl } from "../../../baseurl/baseurl";
export default function Topbar(props) {
  const logout = () => {
    alert("Logout");
    window.location.href = "/Admin/";
    window.localStorage.clear();
    window.localStorage.removeItem("isAuthenticated");
  };
  const [viewdata, setviewdata] = useState([]);

  const viewgetdata = async (id) => {
    console.log("id here", id);
    const res = await fetch(baseurl+`/getdata/signup/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error  here");
    } else {
      setviewdata(data);
      console.log("get data", data);
    }
  };

  useEffect(() => {
    const id = window.localStorage.getItem("usernames");

    viewgetdata(id);
  }, []);
  return (
    <div className="topbar ">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">{props.data}</span>
        </div>
        <div className="topRight">
          <h5
            className="topbarIconContainer text-danger  p-0  mb-0"
            onClick={logout}
          >
            <RiLogoutCircleLine />
          </h5>
          <div className="topbarIconContainer">
            <Link to="/">
              <Language />
            </Link>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src={`/uploads/${viewdata.image}`}
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
