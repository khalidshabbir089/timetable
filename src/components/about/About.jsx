import React from "react";
import "./About.css";
import { useState, useEffect } from "react";
import { baseurl } from "../../baseurl/baseurl";
import HashLoader from "react-spinners/HashLoader";
import Avatar from '@mui/material/Avatar';
const About = () => {
  /*====================================*/
  const [getAboutus, setAboutus] = useState([]);
  const [Aboutusparagrah, setAboutusparagrah] = useState([]);
  const [visibleloading,setvisibleloading]=useState(true)
  const aboutusmember = async () => {
    const res = await fetch(baseurl + "/getdata/about", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setAboutus(data);
    }
  };
  const aboutusp = async () => {
    const res = await fetch(baseurl + "/getdata/aboutusparagraph", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setAboutusparagrah(data);
      setvisibleloading(false)
    }
  };
  useEffect(() => {
    aboutusmember();
    aboutusp();
  }, []);
  /*======================================*/

  return (
    <>
    {
      visibleloading?
      <div className="loading-style" >  <HashLoader color={"#0AA5FF"}  loading={visibleloading} className="" size={100}   aria-label="Loading Spinner"  data-testid="loader"
      /></div>
    :
      <section className="aboutus mb-5">
        <div className="fluid-container">
          <div className="row ">
            <div className=" col-lg bgshape ">
              <h1 className="bgtext text-center ">About Us</h1>
              {Aboutusparagrah.map((obj, id) => {
                return (
                  <>
                    <p
                      className="text-light mt-3"
                      style={{ textAlign: "justify" }}
                    >
                      {obj.description}
                    </p>
                  </>
                );
              })}
            </div>

            <div className="col-lg secondsideabout  mt-5">
              {getAboutus.map((developer, id) => {
                return (
                  <>
                    <div className="aboutsrightdiv  mt-5 d-flex alig-items-start justify-content-start">

                      <Avatar className='my-3'  src={`/uploads/${developer.image}`} sx={{ width: 150, height: 150 }} alt={developer.name} />
                      <div>
                        <h3>{developer.name}</h3>
                        <h6>{developer.profession}</h6>
                        <p>{developer.position}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
}
    </>
  );
};

export default About;
