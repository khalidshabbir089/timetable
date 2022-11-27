import React from "react";
import { useState } from "react";
import swal from 'sweetalert';
import { baseurl } from "../../../baseurl/baseurl";
const Inputbutton = (props) => {

  const [show, setshow] = useState(true);
  const [showcomment, setcomment] = useState("");
  const [showdropdown, setdropdwon] = useState("4");

  const handleClick = () => {};
  /*============================================*/
  const day_value = (slot) => {
    if (slot === "10000") {
      return "Monday";
    } else if (slot === "1000") {
      return "Tuesday";
    }
    else if (slot === "100") {
      return "Wednesday";
    }
    else if (slot === "10") {
      return "Thursday";
    }
    else if (slot === "1") {
      return "Friday";;
    }
  };
  const updateuser = async(e)=>{
 
    e.preventDefault();

    const Subjects=props.Subjects;
    const Teacher=props.Teacher;
    const Room=props.Room;
    const id=props.id;
    const Classess=props.Classess;
    
    const Status=true;
    const Lecture=props.lecture;

    const res2 = await fetch(baseurl+ `/updatestatus/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
        Status,
        })
    });

    const data2 = await res2.json();
    console.log(data2);

    if(res2.status === 422 || !data2){
        alert("fill the data");
    }else{
      const res = await fetch(baseurl+ "/record/lectures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Subjects: props.subject,
          Classess: props.class,
          Lecture: props.lecture,
          Day:day_value(props.day),
          Teacher: props.teacher,
          Room: props.room,
          Option: showdropdown,
          Comment: showcomment,  
          Date: props.date,
          Status: "true",
          id: props.id,
        }),
      });
  
      const data = await res.json();
      console.log(data);
      if (res.status === 422 || !data) {
        console.log("error ");
        alert("error");
      } else {
        setshow(props.St)
        swal("Your Record save successfully!",{
          icon: "success",     
          buttons:false,
          timer: 800,
          margin: "300px"
        });
       
      }

     setcomment("")

    }

 

}
  /*=====================================================*/

  return (
    <>
      <div style={{ display: show ? " block" : "none" }}>
        <form action="">
          <div className="">
            <div className="dropdownmenue ">
              <select
                onChange={(event) => setdropdwon(event.target.value)}
                placeholder="Select Option"
                className="w-100">
                 <option className="" value="4" disabled >
                 Select Option
                </option>
                <option selected value="3">Yes</option>
                <option value="2">Late</option>
                <option value="1">No</option>
              </select>
            </div>
          </div>
          <div className="d-flex flex-column inputfield">
            <input
              className="comment"
              placeholder="Comment here"
              type="text"
              onChange={(event) => setcomment(event.target.value)}
            />
        
          </div>

          <div className="submitbutton">
            <button className="submitbtn bg-primary " onClick={updateuser}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Inputbutton;
