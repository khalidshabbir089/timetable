import React from 'react'
import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';
import Dashboard from '../components/Dashboard';
const Adminpanel = () => {
  return (
   <>
   <div className=''>
      <Header/>
      <Menu/>
      <Dashboard/>
      <Footer/>
   </div>
    
   </>
  )
}

export default Adminpanel