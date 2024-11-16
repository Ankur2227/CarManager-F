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
        const { data } = await axios.get(`http://localhost:5000/api/cars/carDetail/${id}`, {
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

  return (
    <div className="car-detail-container">
      <h2 className="car-title">{car.title}</h2>
      <p className="car-description">{car.description}</p>
      <h4 className="car-tags">Tags: {car.tags.join(', ')}</h4>
      
      <div className="car-images">
        {car.images && car.images.map((image, index) => (
          <div className="image-container" key={index}>
            <img
              src={`http://localhost:5000/${image.replace(/\\/g, '/')}`} // Full URL for image
              alt={`Car image ${index + 1}`}
              className="car-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarDetailPage;
