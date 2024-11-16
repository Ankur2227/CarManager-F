import React, { useContext } from 'react'
import './MyProfile.css'
import EditIcon from '@mui/icons-material/Edit';
import { UserContext } from '../../../Context/Context';

const MyProfile = () => {
    const { user, updateUser } = useContext(UserContext);

  return (
    <div className='profile-container'>
        <div className='profile-first'>
            <div className='profile-first-left'>
                <h1>{user.name}</h1>
                <h4>{user.email}</h4>
                <p>{user.bio}</p>
                <div className='button' style={{width:'20vh',marginTop:'5vh'}}><EditIcon/>Edit Profile</div>
            </div>
            <div className='profile-first-right'>
                <img src={user.pic} alt='profile'/>
            </div>
        </div>
        <div className='profile-second'>

        </div>
        <div className='profile-third'>
            <h1>MyCars</h1>
        </div>
    </div>
  )
}

export default MyProfile