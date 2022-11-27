import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import Hero from '../components/Hero/Hero';
import About from '../components/about/About';

const about = () => {
  return (
   <>
  <Navbar />
  <Hero/>
  <About/>
  <Footer/>
   </>
  )
}

export default about