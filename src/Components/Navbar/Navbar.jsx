import React from 'react'
import './Navbar.css'
import Profile from './Profile/Profile'

const Navbar = ({handleButtonClick}) => {
  return (
    <div className='navbar'>
        <h1>CAR-MANAGEMENT</h1>
        <Profile handleButtonClick={handleButtonClick}/>
    </div>
  )
}

export default Navbar