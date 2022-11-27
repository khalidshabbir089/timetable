import React from "react";
import { useState, useEffect } from "react";
import { baseurl } from "../../baseurl/baseurl";
import "./director.css";
import HashLoader from "react-spinners/HashLoader";
import Avatar from '@mui/material/Avatar';
const Director = () => {
  /*====================================*/
  const [getdirector, setdirector] = useState([]);
  const [visibleloading,setvisibleloading]=useState(true)
  const directorv = async () => {
    const res = await fetch(baseurl + "/getdata/directorv", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setdirector(data);
      setvisibleloading(false)
    }
  };
  useEffect(() => {
    directorv();
  }, []);
  /*======================================*/

  return (
    <>
    {
      visibleloading?
      <div className="loading-style" >  <HashLoader color={"#0AA5FF"}  loading={visibleloading} className="" size={100}   aria-label="Loading Spinner"  data-testid="loader"
      /></div>
    :
      <section className="vision">
        <h1>Director Vision</h1>
        <div className="container mt-3">
          <div className="newfied">
            {getdirector.map((developer, id) => {
              return (
                <>
                  <div>
                    <h3 className="text-center  mt-3 mb-5">{developer.name}</h3>
                    <p>{developer.text}</p>
                  </div>
          
                  <Avatar className="avatar" sx={{ width: 180, height: 180 }} alt="D" src={`/uploads/${developer.image}`} />

                </>
              );
            })}
          </div>
        </div>
      </section>
}
    </>
  );
};

export default Director;
