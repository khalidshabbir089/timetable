import React from 'react'
import Header from './Topbar';
import Menu from './Appbar';
import Directorvision from '../../components/DirectorVision'
import Footer from '../Footer'
const DirectorV = () => {
  return (
    <div className=''>
       
    <Header/>
    <Menu/>
     <Directorvision/>
     <Footer/>
    </div>
  )
}

export default DirectorV