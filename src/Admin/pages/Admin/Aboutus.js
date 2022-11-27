
import React from 'react'
import Header from './Topbar';
import Menu from './Appbar';
import AboutusComponent from '../../components/Aboutus'
import Footer from '../../pages/Footer'
const Aboutus = () => {
  return (
    <>
    <div className=''>
       
    <Header/>
    <Menu/>
     <AboutusComponent/>
     <Footer/>
    </div>
    </>
  )
}

export default Aboutus