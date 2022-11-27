import React from 'react'
import { BsFillTelephoneFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { GrMail } from "react-icons/gr";
import emailjs from '@emailjs/browser';
import { useState } from 'react'
import { validate } from 'react-email-validator';
const ItContactus = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const submit = () => {
 
    if (name && validate(email) && message) {
      const serviceId = 'service_gqj5avb';
      const templateId = 'template_jls8vhy';
      const userId = 'rruPKbEwwgWT-UbOz';
      const templateParams = {
          name,
          email,
          message
      };

      emailjs.send(serviceId, templateId, templateParams, userId)
          .then(response => console.log(response))
          .then(error => console.log(error));
        setName('');
        setEmail('');
        setMessage('');
        setEmailSent(true);
        alert("Your email is sent successfully")
    } else {
        alert('Please fill in all fields.');
    }
  }
  return (
<div className="content-wrapper">
<section className="details container p-5">
        <div className="container">
          <h3 className="text-center text-dark text-uppercase ">Contact us</h3>

          <h4 className="text-center text-xl-start my-5"> </h4>
          <h6 className="text-center text-xl-start mb-2">
          
          </h6>
          <h6 className="text-center text-xl-start mb-5">
            Please contact us if you face any issue.
          </h6>

          <div className=" wraper justify-content-between align-items-center d-flex">
            <div className="right">
              <form action="#">
                <h3 className="sectionheading text-dark">Message</h3>
                <div className="formfield row d-flex justify-content-between inputss">
                  <div className=" col-sm d-flex flex-column mb-3 ">
                    <label for="name">
                      Full Name: <span>*</span>
                    </label>
                    <input
                      className="txtfield"
                      type="text"
                      placeholder="Johan"
                      value={name} onChange={e => setName(e.target.value)}
                      name="Name"
                    />
                  </div>
                  <div className="col-sm d-flex flex-column">
                    <label for="name">
                      Email: <span>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="jhon09@gmail.com"
                      value={email} onChange={e => setEmail(e.target.value)}
                      name="Email"
                  
                    />
                  </div>
                </div>

                <div className="d-flex flex-column  ">
                  <label for="name">
                    Message: <span>*</span>
                  </label>
                  <textarea
                    name="Message"
                    placeholder="Message"
                    id=""
                    cols="30"
                    value={message} onChange={e => setMessage(e.target.value)}
                    rows="5"
                   
                  ></textarea>
                </div>

                <a className="d-flex align-items-center " href="#">
                  <button
                    className="btn bg-primary mb-5"onClick={submit}
                    >
                    Submit
                  </button>
                </a>
              </form>
            </div>
            <div className="left  ">
              <h3 className="sectionheading text-dark">Our Contact</h3>
              <div className="d-flex align-items-center mb-3">
                <GrMail className="me-5 text-primary" />
                <div className="flex">
                  <h5>Email Address</h5>
                  <p className="m-0 p-0">{"khalidshabbir09@gmail.com"}</p>
                 
                </div>
              </div>
              <div className="d-flex align-items-center mb-5">
                <BsFillTelephoneFill className="me-5 text-primary" />
                <div className="flex">
                  <h5>Phone Num</h5>
                  <p className="m-0 p-0">{"+923022905700"}</p>
                 
                </div>
              </div>
             
             
            </div>
          </div>
        </div>
      </section>
 </div>
  )
}

export default ItContactus


