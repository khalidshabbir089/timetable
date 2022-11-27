import React from 'react'
import Header from './Topbar';
import Menu from './Appbar';

import Fileuploadedit from '../../components/Fileuplodit';
const Fileuploadit = () => {
  return (
    <>
    <div className=''>
       <Header/>
       <Menu/>
      <Fileuploadedit/>
      
 
    </div>
     
    </>
  )
}

export default Fileuploadit