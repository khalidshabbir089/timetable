import React from 'react'
import Header from './Topbar';
import Menu from './Appbar';
import Footer from '../../pages/Footer'
import Monitering_Users from '../../components/MoniteringUsers'
const MoniteringUsers = () => {
  return (
   <>
   <div className=''>
       
       <Header/>
       <Menu/>
        <Monitering_Users/>
        <Footer/>
       </div>
   </>
  )
}

export default MoniteringUsers