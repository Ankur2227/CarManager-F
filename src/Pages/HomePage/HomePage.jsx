import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import SideBox from '../../Components/SideBox/SideBox.jsx'
import MainBox from '../../Components/MainBox/MainBox.jsx'
import './HomePage.css'

const HomePage = () => {
  const [clickedButton, setClickedButton] = useState('MyCars');

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
    // You can perform other actions based on the clicked button here
  };

  return (
    <div classname='HomePageContainer'>
      <div className='nav-container'>
        <Navbar handleButtonClick={handleButtonClick}/>
      </div>
      <div className='Container'>
        <div className='side-container'>
          <SideBox clickedButton={clickedButton} handleButtonClick={handleButtonClick} />
        </div>
        <div className='main-container'>
          <MainBox clickedButton={clickedButton}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage