import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/Context';
import './CarDetailPage.css';

const CarDetailPage = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams(); // Extract the car ID from the URL params
  const [car, setCar] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Check if the user is logged in, if not, navigate to login page
    if (!user || !user.token) {
      navigate('/'); // Redirect to login page if no user or token
      return;
    }

    // Fetch car details only if the user is authenticated
    const fetchCarDetails = async () => {
      try {
        const { data } = await axios.get(`/api/cars/carDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Ensure the token is passed in headers
          },
        });
        setCar(data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCarDetails();
  }, [id, user, navigate]); // Run useEffect when the id, user, or navigate changes

  if (!car) {
    return <p>Loading...</p>; // Show loading message while data is being fetched
  }

  // Handle back to homepage navigation
  const handleGoBack = () => {
    navigate('/homepage'); // Navigates to homepage (or whichever page you want)
  };

  // Handle edit car details navigation
  const handleEditCar = () => {
    navigate(`/edit-car/${id}`); // Navigates to the edit car page using the car ID
  };

  return (
    <div className="car-detail-container">
      <h2 className="car-title">{car.title}</h2>
      <p className="car-description">{car.description}</p>
      <h4 className="car-tags">Tags: {car.tags.join(', ')}</h4>
      
      <div className="car-images">
        {car.images && car.images.map((image, index) => (
          <div className="image-container" key={index}>
            <img
              src={`/${image.replace(/\\/g, '/')}`} // Full URL for image
              alt={`Car image ${index + 1}`}
              className="car-image"
            />
          </div>
        ))}
      </div>

      <div className="buttons-container">
        {/* Button to go back to homepage */}
        <button onClick={handleGoBack} className="go-back-button">
          Go Back to Homepage
        </button>
        
        {/* Button to edit car details */}
        <button onClick={handleEditCar} className="edit-car-button">
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default CarDetailPage;
