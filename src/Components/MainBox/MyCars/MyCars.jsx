import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './MyCars.css';
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon
import { UserContext } from '../../../Context/Context';

const MyCars = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/cars/user-cars', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCars(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cars.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCars = cars.filter((car) => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      car.title.toLowerCase().includes(lowerCaseSearch) ||
      car.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearch))
    );
  });

  const handleCardClick = (carId) => {
    navigate(`/car-detail/${carId}`);
  };

  const handleDelete = async (e, carId) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/carDetail/${carId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        // Filter out the deleted car from the state
        setCars(cars.filter((car) => car._id !== carId));
        alert('Car deleted successfully');
        navigate('/homepage'); // Redirect to MyCars page after successful deletion
      } catch (err) {
        console.error(err);
        setError('Failed to delete the car.');
      }
    }
  };

  return (
    <div className="my-cars-container">
      <h2>My Cars</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="cars-grid">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div
                key={car._id}
                className="car-card"
                onClick={() => handleCardClick(car._id)} // Navigate to car detail on card click
              >
                <img
                  src={car.images[0]} // Show first image
                  alt={car.title}
                  className="car-image"
                />
                <div className="car-details">
                  <h3>{car.title}</h3>
                  <p>{car.description.slice(0, 100)}...</p>
                  <div className="car-tags">
                    {car.tags && car.tags.length > 0 ? (
                      car.tags.map((tag, index) => (
                        <span key={index} className="car-tag">
                          {tag}
                        </span>
                      ))
                    ) : (
                      <p>No tags available</p>
                    )}
                  </div>
                </div>

                <div className="action-icons">
                  {/* Only delete button is visible */}
                  <div className="delete-icon" onClick={(e) => handleDelete(e, car._id)}>
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No cars found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyCars;
