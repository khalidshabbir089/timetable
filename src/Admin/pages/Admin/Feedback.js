import React from 'react'
import Header from './Topbar';
import Menu from './Appbar';
import Feedbacks from '../../components/Feedback'
import Footer from '../../pages/Footer'
const Feedback = () => {
  return (
    <div className=''>
       
    <Header/>
    <Menu/>
     <Feedbacks/>
     <Footer/>
    </div>
  )
}

export default Feedback