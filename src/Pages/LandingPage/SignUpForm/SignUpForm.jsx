import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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
        "/api/user/register",
        { name, email, password, pic },
        config
      );

      console.log(resp);

      if(resp.status === 201)
      {
        toast.success('Login Successful!');
        Cookies.set('userInfo', JSON.stringify(resp.data), { expires: 7 }); // Set cookie expiration (in days)
        setPicLoading(false);
        navigate('/homepage');
        window.location.reload()
      }
      else if(resp.status === 202){
        toast.warn(resp.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log("Something went wrong.");
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast("Please Select an Image!");
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "ankur2227");
      fetch("https://api.cloudinary.com/v1_1/ankur2227/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast("Please Select an Image!")
      setPicLoading(false);
      return;
    }
  };


  return (
    <form className='LandingForms' onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder='Name'
          autoFocus
          required
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder='Email'
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder='Password'
          required
        />
      </div>
      <div className='picUpload'>
        <input
          type="file"
          id="pic"
          name="pic"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </div>
      <div>
        
        <button type="submit">SIGN UP</button>
        {picLoading && <Spinner size='xl'/>}
      </div>
    </form>
  );
};

export default SignUpForm;
