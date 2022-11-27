import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import {baseurl} from "../../baseurl/baseurl"
import "./Login.css";
import HashLoader from "react-spinners/HashLoader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible,setvisible]=useState(false)

  const loginUser = async (e) => {

    e.preventDefault();
    setvisible(true)
    const response = await fetch( baseurl+"/login/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      localStorage.setItem("usernames", data.username);
      localStorage.setItem("isAuthenticated", data.user);
      setvisible(false)
      window.location.href = "/Admin/Adminpanel";
    } else {
      alert("Please check your username and password");
    }
  };

  return (
    <>
    <div className="container d-flex align-items-center justify-content-center">
    <div className="   text-center position-absolute top-50 " >
    <HashLoader color={"#0AA5FF"} loading={visible} className="" size={100} aria-label="Loading Spinner" data-testid="loader"
          />
        </div>
    </div>
    
      <section className="login">
       
        <div className="wrapperslogin bg-white">
          <div className="h2 text-center d-flex align-items-center justify-content-center px-auto"><Avatar className="" alt="Remy Sharp"  sx={{ width: 150, height: 150 }} src="/assets/images/logopng1231.png" /></div>
          <div className="h6 text-muted text-center pt-2">
            Enter your login details
          </div>
          <form className=" pt-3" onSubmit={loginUser}>
            <div className="form-group py-2 mt-2">
              <div className="input-field">
                {" "}
                <span className="far fa-user p-2"></span>{" "}
                <input
                  type="text"
                  placeholder="Username or Email Address"
                  required
                  className=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
              </div>
            </div>
            <div className="form-group py-1 pb-2">
              <div className="input-field mt-3">
                {" "}
                <span className="fas fa-lock p-2"></span>{" "}
                <input
                  type="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className=""
                />{" "}
              
              </div>
            </div>
            <div className="d-flex align-items-start">
              <div className="ml-auto mt-2">
                {" "}
                <a className="text-dark" href="#" id="forgot">
                  Forgot Password?
                </a>{" "}
              </div>
            </div>{" "}
            <input type="submit" className="btn btn-block mt-5" value="Login" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
