import React from "react";
import { useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { IoMdPersonAdd } from "react-icons/io";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { baseurl } from "../../../baseurl/baseurl";

const Aboutus = () => {
  /*==========================================================================*/

  const [shownew, setShownew] = useState(false);
  const [viewprofiles, setviewprofile] = useState(false);

  /*=====================================================================*/
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [image, setimage] = useState("");

  /*=================================================================*/
  const [getuserdata, setUserdata] = useState([]);

  const getdata = async () => {
    const res = await fetch(baseurl+ "/gertusers/signin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setUserdata(data);
    }
  };

  useEffect(() => {
    getdata();
  }, []);
  /*======================================================*/
  const deleteuser = async (did) => {
    const res2 = await fetch(baseurl+ `/signup/delete/${did}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
      alert("There is an error");
    } else {
      console.log("user deleted");
      alert("Your record is delete");
      getdata();
    }
  };
  /*==============================================================================*/
  const viewprofile = (id) => {
    setviewprofile(!viewprofiles);
    viewgetdata(id);
  };
  const [viewdata, setviewdata] = useState([]);

  const viewgetdata = async (id) => {
    const res = await fetch(baseurl+ `/getdata/signup/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setviewdata(data);
      console.log("get data");
    }
  };

  /*==================================================================*/
  const onChangeFile = (events) => {
    setimage(events.target.files[0]);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    if (password === repassword) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      axios
        .post(baseurl+ "/register/signupusers", formData)
        .then((res) => {
          alert("Your Record has been Saved Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please Enter correct password");
    }
  };

  /*=======================================================================*/
  return (
    <>
      <section className="aboutusadmin">
        <h2 className="text-center mt-3">About Us Page</h2>
        <div className="container py-5 px-3 mt-2 ">
          <div className="text-end">
            {" "}
            <button
              className="btn btn-success px-3"
              onClick={() => setShownew(!shownew)}
            >
              <IoMdPersonAdd />
            </button>
          </div>
          <div
            className="newmember aboutusdiv p-5 pt-3"
            style={{ display: shownew ? "block" : "none" }}
          >
            <div className="container ">
              <h2 className="text-center">Intsert new Team Member</h2>
              <div className="row">
                <div className="container">
                  <form onSubmit={changeOnClick} encType="multipart/from-data">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputEmail1" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        name="Name"
                        onChange={(e) => setname(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" className="form-label">
                        Eamil
                      </label>
                      <input
                        type="text"
                        name="Position"
                        required
                        onChange={(e) => setemail(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        name="Bio"
                        required
                        className="form-control w-100"
                        onChange={(e) => setpassword(e.target.value)}
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" className="form-label">
                        Re-Enter Password
                      </label>
                      <input
                        type="password"
                        name="Bio"
                        required
                        className="form-control"
                        onChange={(e) => setrepassword(e.target.value)}
                        id="exampleInputPassword1"
                      />
                    </div>

                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                      <label for="exampleInputPassword1" className="form-label">
                        Choose image:
                      </label>
                      <input
                        type="file"
                        filename="image"
                        onChange={onChangeFile}
                        required
                        className="form-control-file"
                        id="exampleInputPassword1"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.map((element, id) => {
                return (
                  <>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.name}</td>
                      <td>{element.email}</td>

                      <td>
                        <button
                          className="btn btn-success px-3"
                          onClick={() => viewprofile(element._id)}
                        >
                          <AiFillEye />
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-primary px-3">
                          <AiFillEdit />
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger px-3"
                          onClick={() => deleteuser(element._id)}
                        >
                          <RiDeleteBin6Fill />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          {/* =======================================Table End here======================================================= */}
          <div
            className="viewprofile  aboutusdiv profile p-5 pt-3"
            style={{ display: viewprofiles ? "block" : "none" }}
          >
            <div className="container d-flex align-items-center">
              <div className="text-start ">
                <img className="" src={`/uploads/${viewdata.image}`} alt="" />
              </div>
              <div className="texts">
                <h1>{viewdata.name}</h1>
                <p>{viewdata.email}</p>
              </div>
            </div>
          </div>
          {/* =========================================================================================================== */}
        </div>

        {/*////////////////////////////////////////////////////////////////////////////////  */}
      </section>
    </>
  );
};

export default Aboutus;
