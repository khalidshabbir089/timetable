import React from 'react'
import {Link} from "react-router-dom";
import './News.css'
const News = () => {
  return (
   <>
   <section class="news container" >
<div className='mb-3 newslink d-flex align-items-center justify-content-between'><h1 class="ml-5  latestnews">Latest News</h1>
<a class="text-end" href="https://sahiwal.comsats.edu.pk/" target="_blank">
<p class="develop m-0 p-0  ">More</p></a>
</div>

<div class="cover ">
    
          <div class="newsfied  p-4  mt-5 mb-5">
            <h5 className='p-3 m-2 text-light rounded-3' style={{ backgroundColor: "#027BFF" }}>Convocation Registration 2022</h5>
            <p class=" mb-2 mt-4">Students who have graduated in Fall 2021 and Spring 2022 are eligible to participate in the Convocation to be held at CUI, Sahiwal Campus on Wednesday, November 09th, 2022.</p>
            <div className='text-center'>
              <a href='https://sahiwal.comsats.edu.pk/Convocation_Reg.aspx' className=' fw-bold' style={{ color: "#027BFF" }} target={"_blank"}>Click Here For More Details</a>

            </div>
          </div>
          <div class="newsfied  p-4  mt-5 mb-5">
            <h5 className='p-3 m-2 text-light rounded-3' style={{ backgroundColor: "#027BFF" }}>Academic Calendar FALL 2022</h5>
            <p class=" mb-2 mt-4">
            Semester Calendar for Undergraduate and Graduate FALL 2022 semester has been declared.
            </p>
            <div className='text-center'>
              <a href='https://sahiwal.comsats.edu.pk/Academic_Calendar.aspx' className=' fw-bold' style={{ color: "#027BFF" }} target={"_blank"}>Click Here to download</a>

            </div>
          </div>
          <div class="newsfied  p-4  mt-5 mb-5">
            <h5 className='p-3 m-2 text-light rounded-3' style={{ backgroundColor: "#027BFF" }}>Admissions Fall 2022</h5>
            <p class=" mb-2 mt-4">Last date to apply is September 02, 2022.</p>
            <div className='text-center'>
              <a href='https://admissions.comsats.edu.pk/' className=' fw-bold' style={{ color: "#027BFF" }} target={"_blank"}>Click Here to Apply</a>

            </div>
          </div>
         
       

</div>

</section>
   <script type='text/javascript'>

   </script>
   </>
  )
}

export default News