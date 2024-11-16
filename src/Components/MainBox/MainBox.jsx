import React from 'react'
import './MainBox.css'
import MyProfile from './MyProfile/MyProfile'
import MyCars from './MyCars/MyCars'
import AddNewCar from './AddNewCar/AddNewCar'

const MainBox = ({ clickedButton }) => {
  let content;

  // Conditional rendering based on the clickedButton value
  if (clickedButton === 'MyCars') {
    content = <MyCars />;
  } else if (clickedButton === 'AddNewCar') {
    content = <AddNewCar />;
  } else if (clickedButton === 'Profile') {
    content = <MyProfile />;
  } else {
    content = <h1>Default Content or Error Message</h1>;  // You can replace this with any fallback UI
  }

  return (
    <div className='mainbox-container'>
      {content}
    </div>
  );
}

export default MainBox;
