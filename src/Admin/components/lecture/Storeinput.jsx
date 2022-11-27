import React from 'react'
import { BiTime } from "react-icons/bi";
import { SiGoogleclassroom } from "react-icons/si";
import { useState, useEffect } from "react";
import Inputbutton from './Updatabtn';
import { baseurl } from '../../../baseurl/baseurl';
const Storeinput = () => {

  const [FilterData, setFilterData] = useState([]);
  const getdata = async () => {

    const res = await fetch(baseurl+ "/lecturerocord/data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("This is data here");
  
    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      console.log("This is data of odata")
      console.log(data)
      setFilterData(data)
    }
  };
  useEffect(() => {
    getdata();    
  }, []);

const refresh=()=>{
  getdata();
}

// =============================




  return (
    <>

    <div className='mt-3 text-center'><button className='btn btn-primary  mt-5 w-75' onClick={refresh}>Refresh</button></div>
     <div className="row mt-3 d-flex row-cols-1 pt-2  align-items-center justify-content-center mb-5">
            {FilterData.reverse().filter((item, idx) => idx < 5).map((datavalues, id) => {
              return (
                <>
                  <div className="col  columndiv" key={id}>
                   
                    <h3 className=" subject mt-3 ">{datavalues.Subjects}</h3>
                    <p className=" teacher mt-3">{datavalues.Teacher}</p>
                    <div className="roombg bg-gray rounded " style={{ padding: "1px 1px" }}>
                      <h2 className="text-center mt-3 fw-bold  room ">
                        {datavalues.Room}
                      </h2>
                    </div>
                    <div className="text-center mt-3 ">
                      <div className="d-sm-flex align-items-center  classdivclassname ">
                        <p className="icons classes">
                          <SiGoogleclassroom />
                        </p>
                        <p className="text-center classess   ">
                          {datavalues.Classess}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="icons p-0 m-0 text-dark">
                          <BiTime />
                        </p>
                        <p className="text-center lecture mb-3 ">
                          {datavalues.Lecture}
                        </p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="icons p-0 m-0 text-dark">
                          <BiTime />
                        </p>
                        <p className="text-center lecture mb-3 ">
                          {datavalues.Day}
                        </p>
                      </div>
                    </div>
                    <hr />
                 <Inputbutton
                 class={datavalues.Classess}
                 subject={datavalues.Subjects}
                 teacher={datavalues.Teacher}
                 room={datavalues.Room}
                 lecture={datavalues.Lecture}
                 day={datavalues.Day}
                 date={datavalues.Date}
                 
                 option={datavalues.Option}
                 comment={datavalues.Comment}
                 report={datavalues.Report}
                 id={datavalues._id}
                 />
                  </div>
                </>
              );
            })}
          </div>
    </>
  )
}

export default Storeinput