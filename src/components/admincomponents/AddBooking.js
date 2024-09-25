import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from '../../config';

function AddBooking() {
  const { projectId } = useParams(); // Get project ID from URL
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    // description: '',
    images: null,
    // scrollImages: null // Include scroll images in the state
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value // Set files if they exist, otherwise set value
    }));
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    // data.append('description', formData.description);

    // Handle multiple file uploads for images and scrollImages
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        data.append('images', formData.images[i]);
      }
    }
    // if (formData.scrollImages) {
    //   for (let i = 0; i < formData.scrollImages.length; i++) {
    //     data.append('scrollImages', formData.scrollImages[i]);
    //   }
    // }

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-booking/${projectId}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 201) {
        navigate(`/admin/project/${projectId}`); // Redirect to dashboard after successful addition
      }
    } catch (err) {
<<<<<<< HEAD
      setError(err.response?.data?.message || 'Failed to add title image section');
=======
      setError(err.response?.data?.message || 'Failed to add booking');
>>>>>>> 7fcad1be3a79880e0b4f7b1dc07ed8c54c852e58
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dash_title">Add Title Images</h1>
        <div className="back_btn_wrap">
        <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
        <div className="title_img_wrap">
          <div className="title_img_inner">
        <form onSubmit={handleAddBooking} encType="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div> */}
          {/* <div className="form-group">
            <label>Scroll Images</label>
            <input
              type="file"
              name="scrollImages"
              multiple
              onChange={handleInputChange}
              required
            />
          </div> */}
          <div className="form-group">
            <label>Images</label>
            <input
              type="file"
              name="images"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add_title_btn">
          <button type="submit">Add</button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
        </div>
        </div>
      </div>
    </div>
  );
}

export default AddBooking;
