import React from "react";
import { useState } from "react";
const DatesheetLogin = () => {
  const [username, setusername] = useState([]);
  const [password, setpassword] = useState([]);

  const signup = () => {
    alert(
      "We are working on Teacher datesheet Sign In and Sign up module. It will be update soon"
    );
  };
  const u = "khalidshabbir09@gmail.com";
  const p = "28452458";
  const login = () => {
    if (username && password === "") {
      alert("Please Enter Username or password");
    } else {
      if (u === username) {
        if (p === password) {
          alert("login Succssfull");
          window.location.href = "/teacherdatesheetLogin_true";
        } else {
          alert("Incorrect username or password");
        }
      } else {
        alert("Incorrect username or password");
      }
    }
  };
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div className="login-form bg-light mt-4 p-4">
              <h4>Welcome Back</h4>
              <div className="col-12 mb-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div className="col-12  mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
              </div>
              <div className="col-12  mb-3">
                <div className="form-check  mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" for="rememberMe">
                    {" "}
                    Remember me
                  </label>
                </div>
              </div>
              <div className="col-12  mb-5 pb-5">
                <button className="btn btn-dark float-end mb-5" onClick={login}>
                  Login
                </button>
              </div>

              <div className="  mt-5">
                <div className="mt-5">
                  <hr />
                </div>
                <p className="text-center mb-0" onClick={signup}>
                  Have not account yet? <a href="#">Signup</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatesheetLogin;
