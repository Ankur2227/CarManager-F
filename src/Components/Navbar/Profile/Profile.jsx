import React, { useContext, useEffect, useRef, useState } from 'react'
import './Profile.css'
import { UserContext } from '../../../Context/Context';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = ({handleButtonClick}) => {
  
  const { user, updateUser } = useContext(UserContext);
  const [viewProfile, setViewProfile] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate hook

  // const profileMenuRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
  //       setViewProfile(false);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [profileMenuRef]);

  const handleLogout = ()=>{
    Cookies.remove('userInfo');
    toast.success('Logout Successful!');
    navigate('/');
  }

  return (
    <>
    <div className='profile' onClick={()=>{setViewProfile(!viewProfile)}}>
        <span>{user?.name}</span>
        <img className='profile-pic' src={user?.pic} alt='profile-pic'/>
    </div>
    {viewProfile && <div className='profile-menu' >
        <div className='button' onClick={()=>{handleButtonClick('Profile')}}>My Profile</div>
        <div className='button' onClick={handleLogout}>Logout</div>
    </div>}
    </>
  )
}

export default Profile