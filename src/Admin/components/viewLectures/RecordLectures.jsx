import React from "react";
import { useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { baseurl } from "../../../baseurl/baseurl";
const RecordLectures = () => {
  const [getuserdata, setUserdata] = useState([]);

  const getdata = async () => {
    const res = await fetch(baseurl+"/getrecord/lectures", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
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
  const deleteuser = async (id) => {
    const res2 = await fetch(baseurl+`/record/lecturesdelete/${id}`, {
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

  const Day = (day) => {
    if (day === "10000") {
      return "Monday";
    } else if (day === "1000") {
      return "Tuesday";
    } else if (day === "100") {
      return "Wednesday";
    } else if (day === "10") {
      return "Thursday";
    } else if (day === "1") {
      return "Friday";
    }
  };

  /*====================================================================*/
  return (
    <>
      <section className="feedbacksection  px-3">
        <div className="container py-5 px-3 mt-5 tablediv">
          <table class="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Subject</th>
                <th scope="col">Class</th>
                <th scope="col">Teacher</th>
                <th scope="col">Room</th>
                <th scope="col">Lecture </th>
                <th scope="col">Status</th>
                <th scope="col">Comment</th>
                <th scope="col">Report</th>
                <th scope="col">Date</th>
                <th scope="col">Day</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.reverse().map((element, id) => {
                return (
                  <>
                    <tr>
                      <td>{element.Subjects}</td>
                      <td>{element.Classess}</td>
                      <td>{element.Teacher}</td>
                      <td>{element.Room}</td>
                      <td>{element.Lecture}</td>
                      <td>{element.Option}</td>
                      <td>{element.Comment}</td>
                      <td>{element.Report}</td>
                      <td>{element.Date}</td>
                      <td>{Day(element.Day)}</td>
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
        </div>
      </section>
    </>
  );
};

export default RecordLectures;
