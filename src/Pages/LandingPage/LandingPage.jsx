import React, { useState } from 'react'
import './LandingPage.css'
import LoginForm from './LoginForm/LoginForm';
import SignUpForm from './SignUpForm/SignUpForm';

const LandingPage = () => {
    const [isLoginClicked, setlogin] = useState(false);
    const [isSignUpClicked, setSignUp] = useState(false);

  return (
    <div className='Landing-page-container'>
        <h1 className='title' >CAR-MANAGEMENT</h1>
        <div className='LandingPage'>
            <div className='LandingPageButton' onClick={()=>{
                setlogin(true);
                if(isSignUpClicked)setSignUp(!isSignUpClicked);
            }}>
                {!isLoginClicked?<div style={{ userSelect: 'none', fontSize: '4vh' , width: 'auto' }}>Already a User?</div>:<LoginForm />}
            </div>
            <div className='LandingPageButton' onClick={()=>{
                setSignUp(true);
                if(isLoginClicked)setlogin(!isLoginClicked);
            }}>
                {!isSignUpClicked?<div style={{ userSelect: 'none', fontSize: '4vh' }}>New User?</div>:<SignUpForm/>}
            </div>
        </div>
    </div>
  )
}

export default LandingPage