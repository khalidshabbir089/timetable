import React from "react";
import { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { baseurl } from "../../../baseurl/baseurl";

const Contacts = () => {
  const [showaboutus, setaboutus] = useState(false);

  /*=====================================================================*/

  const [gettext, settext] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [id, setid] = useState("");

  /*=================================================================*/

  const [getaboutusdata, setaboutusdata] = useState([]);

  /*========================================================*/
  const getdataaboutus = async () => {
    const res = await fetch(baseurl+ "/getdata/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setaboutusdata(data);
    }
  };

  useEffect(() => {
    getdataaboutus();
  }, []);
  /*================================================================*/

  /*====================================================*/
  const updateuser = async (e) => {
    e.preventDefault();

    const res2 = await fetch(baseurl+ `/updatcontact/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        email: email,
        text: gettext,
      }),
    });
    alert(gettext);
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("fill the data");
    } else {
      alert("Data updated Successfully");
      
    }
  };

  /*======================================================*/
  return (
    <>
      <section className="searchsection">
        <div className="container searchbar mt-3 p-3 d-flex align-items-center ">
          <NavLink
            className="navbar_items me-3 text-primary"
            aria-current="pages"
            to="/Admin/pages"
          >
            About us
          </NavLink>
          <NavLink
            className="navbar_items me-3 text-primary"
            aria-current="pages_director"
            to="/Admin/pages_director"
          >
            Director
          </NavLink>
          <NavLink
            className="navbar_items me-3 text-primary"
            aria-current="page"
            to="/Admin/pages_contact"
          >
            Contacts
          </NavLink>
        </div>
      </section>
      {/* =============================================================================== */}
      <section className="aboutusadmin mt-5">
        <h2 className="text-center mt-3">Contact Details</h2>

        <div className="container py-5 px-3 mt-2 ">
          <div
            className="newmember aboutusdiv p-3 pt-3"
            style={{ display: showaboutus ? "block" : "none" }}
          >
            <div className="container ">
              <h2 className="text-center">Please enter Contacts</h2>
              <div className="row">
                <form>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1" class="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+92123456677"
                      name="Name"
                      onChange={(e) => setphone(e.target.value)}
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="example@gmail.com"
                      name="Name"
                      onChange={(e) => setemail(e.target.value)}
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputEmail1" class="form-label">
                      Address
                    </label>
                    <textarea
                      type="text"
                      required
                      name="Name"
                      placeholder="Address here"
                      onChange={(e) => settext(e.target.value)}
                      className="form-control "
                      id="exampleInputEmail1"
                    />
                  </div>
                  {/* 
                  <div className="mb-3 col-lg-6 col-md-6 col-12">
                    <label for="exampleInputPassword1" className="form-label">
                      Choose image:
                    </label>
                    <input
                      type="file"
                      filename="image"
                      required
                      className="form-control-file"
                      id="exampleInputPassword1"
                    />
                  </div> */}

                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={updateuser}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            {" "}
            <table class="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {getaboutusdata.map((element, id) => {
                  return (
                    <>
                      <tr>
                        <td>{element.phone}</td>
                        <td>{element.email}</td>
                        <td>{element.address}</td>

                        <td className="">
                          <button
                            className="btn btn-primary px-3"
                            onClick={() => {
                              setaboutus(!showaboutus);
                              setid(element._id);
                            }}
                          >
                            <AiFillEdit />
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* =======================================Table End here======================================================= */}

          {/* =========================================================================================================== */}
        </div>

        {/*////////////////////////////////////////////////////////////////////////////////  */}
      </section>
    </>
  );
};

export default Contacts;
