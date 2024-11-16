import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/Context';
import './EditCarPage.css';

const EditCarPage = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams(); // Get car ID from URL params
  const navigate = useNavigate();

  const [carDetails, setCarDetails] = useState({
    title: '',
    description: '',
    tags: [],
    images: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    if (!user) {
      return; // Redirect to login if no user is found
    }

    const fetchCarDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/carDetail/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCarDetails(response.data); // Set the car details to be edited
      } catch (err) {
        console.error(err);
        setError('Failed to fetch car details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleTagsChange = (e, index) => {
    const newTags = [...carDetails.tags];
    newTags[index] = e.target.value;
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      tags: newTags,
    }));
  };

  // Add new tag input field
  const handleAddTag = () => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      tags: [...prevDetails.tags, ''], // Add a new empty tag
    }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length + carDetails.images.length <= 10) {
      setImageFiles(files); // Store the selected files
    } else {
      setError('You can upload a maximum of 10 images.');
    }
  };

  const handleImageDelete = (image) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      images: prevDetails.images.filter((img) => img !== image),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append car details to formData
    formData.append('title', carDetails.title);
    formData.append('description', carDetails.description);
    formData.append('tags', carDetails.tags.join(',')); // Join the tags as a string

    // Append existing images and new images to formData
    carDetails.images.forEach((image) => {
      formData.append('images', image);
    });

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('images', imageFiles[i]);
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/cars/carDetail/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/car-detail/${id}`); // Navigate to the car details page after successful update
    } catch (err) {
      console.error(err);
      setError('Failed to update car details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-car-container">
      <h2>Edit Car Details</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="edit-car-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={carDetails.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={carDetails.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          {carDetails.tags.map((tag, index) => (
            <input
              key={index}
              type="text"
              value={tag}
              onChange={(e) => handleTagsChange(e, index)}
            />
          ))}
          <button type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>

        <div className="form-group">
          <label>Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            disabled={carDetails.images.length + imageFiles.length >= 10}
          />
          <div className="image-preview">
            {carDetails.images.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img src={`http://localhost:5000/${image.replace(/\\/g, '/')}`} alt={`Car Image ${index + 1}`} />
                <button type="button" onClick={() => handleImageDelete(image)}>
                  Delete
                </button>
              </div>
            ))}
            {imageFiles.length > 0 && Array.from(imageFiles).map((file, index) => (
              <div key={index} className="image-preview-item">
                <img src={URL.createObjectURL(file)} alt={`New Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Car'}
        </button>
      </form>
    </div>
  );
};

export default EditCarPage;
