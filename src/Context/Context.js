// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Create the UserContext
export const UserContext = createContext();

// Create a UserProvider component
export const UserProvider = ({ children }) => {
  // State to store the user data
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  // Effect to initialize user from cookie when the component mounts
  useEffect(() => {
    const userDataFromCookie = Cookies.get('userInfo');
    if (userDataFromCookie) {
      setUser(JSON.parse(userDataFromCookie));
    } else {
      // If cookie is empty, navigate to '/'
      navigate('/');
    }
  }, [navigate]); // Include navigate in the dependency array to prevent useEffect from running infinitely

  // Function to update user and set it to cookie
  const updateUser = (newUserData) => {
    setUser(newUserData);
    Cookies.set('userInfo', JSON.stringify(newUserData), { expires: 7 }); // Set cookie to expire in 7 days
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
