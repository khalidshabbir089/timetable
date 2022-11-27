import React from 'react'
import { useState } from 'react'
import { baseurl } from '../../../baseurl/baseurl'

const Updatabtn = (props) => {
  
const [comment,setcomments]=useState(props.comment)
const [report,setreport]=useState(props.report)
const [dropdown,setdropdown]=useState(props.option)

 

// ====================================================
const setdropdwon=(newvalue)=>{
setdropdown(newvalue)
}
const setcomment=(newvalue)=>{
  setcomments(newvalue)
}

const setReport=(newvalue)=>{
    setreport(newvalue)
}

const updatebtn= async()=>{
 
  const res2 = await fetch(baseurl+ `/updatestatus/recordvalues/${props.id}`,{
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
     
      Subjects:props.subject,
      Classess:props.class,
      Lecture:props.lecture,
      Day:props.day,
      Teacher:props.teacher,
      Room:props.room,
      Option:dropdown, 
      Comment:comment,
      Report:report,
      Date:props.date

    })
});

const data2 = await res2.json();
console.log(data2);

if (res2.status === 422 || !data2) {
  console.log("error ");
} else {
  alert("Your record has been updated!!!")
}
    
}




    // ============================================
  return (
   <>
      
          <div className="">
            <div className="dropdownmenue ">
              <select
                onChange={(event) => setdropdwon(event.target.value)}
                placeholder="Select Option"
                className="w-100"
                value={dropdown}
              >
                 <option  disabled selected>
                  Select your option
                </option>
                <option value="3">Yes</option>
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
              value={comment}
              onChange={(event) => setcomment(event.target.value)}
            />
            
          </div>

          <div className="submitbutton">
            <button className="submitbtn bg-primary " onClick={()=>{
              updatebtn()
            }}>
              Update
            </button>
          </div>
      
   </>
  )
}

export default Updatabtn