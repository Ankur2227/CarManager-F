import React, { useState, useContext } from "react";
import "./AddNewCar.css";
import axios from "axios";
import { UserContext } from "../../../Context/Context"; // Assuming UserContext provides user info

const AddNewCar = () => {
  const { user } = useContext(UserContext); // Get the current user's info from context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]); // Change tags to an array
  const [newTag, setNewTag] = useState(""); // For capturing the new tag input
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files.length > 10) {
      setError("You can upload a maximum of 10 images.");
      return;
    }
    setImages(Array.from(e.target.files)); // Convert FileList to array
    setError("");
  };

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleTagAdd = (e) => {
    if (e.key === "Enter" && newTag.trim() !== "") {
      setTags((prevTags) => [...prevTags, newTag.trim()]);
      setNewTag(""); // Clear input after adding tag
      e.preventDefault(); // Prevent form submission when Enter is pressed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || tags.length === 0) {
      setError("All fields are required.");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", JSON.stringify(tags)); // Convert tags array to string

      images.forEach((image) => {
        formData.append("images", image); // Append each image
      });

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`, // Assuming the user token is in context
        },
      };

      const { data } = await axios.post("http://localhost:5000/api/cars/add", formData, config);
      console.log(data);

      // Reset form after successful submission
      setTitle("");
      setDescription("");
      setTags([]);
      setNewTag("");
      setImages([]);
      setError("");
      alert("Car added successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to upload the car. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-new-car-container">
      <h2>Add a New Car</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="add-new-car-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter car title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter car description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (Press Enter to add each tag):</label>
          <input
            type="text"
            id="tags"
            value={newTag}
            onChange={handleTagChange}
            onKeyDown={handleTagAdd} // Add tag on Enter key press
            placeholder="e.g., SUV, Toyota, DealerName"
          />
          <div className="tags-display">
            {tags.map((tag, index) => (
              <span key={index} className="car-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="images">Upload Images:</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Upload up to 10 images.</p>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Add Car"}
        </button>
      </form>
    </div>
  );
};

export default AddNewCar;
