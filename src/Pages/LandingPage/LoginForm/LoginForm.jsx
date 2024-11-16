import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    console.log("clicked");
    e.preventDefault();
    // Add logic for handling form submission, such as calling an authentication function
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const resp = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      console.log(resp);
      if(resp.status === 201)
      {
        toast.success('Login Successful!');
        // console.log("tesp",resp.data)
        Cookies.set('userInfo', JSON.stringify(resp.data), { expires: 7 }); // Set cookie expiration (in days)
        navigate('/homepage');
        window.location.reload()
      }
      else if(resp.status === 202){
        toast.warn(resp.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <form className='LandingForms' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder='Email'
          onChange={handleEmailChange}
          autoFocus
          required
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div>
        <button type="submit">LOGIN</button>
        
      </div>
    </form>
  );
};

export default LoginForm;
