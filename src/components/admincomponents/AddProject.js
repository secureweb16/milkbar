import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from '../../config';

function AddNewProject() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    whatWeDo: '',
    brandDirection: '',
    images: null,
    featuredImage: null,
    bannerImage: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files : value // Set files if they exist, otherwise set value
    }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('whatWeDo', formData.whatWeDo);
    data.append('brandDirection', formData.brandDirection);

    // Handle multiple file uploads for images
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        data.append('images', formData.images[i]);
      }
    }
    // Single file upload for featured image
    if (formData.featuredImage) {
      data.append('featuredImage', formData.featuredImage[0]);
    }
    // Single file upload for banner image
    if (formData.bannerImage) {
      data.append('bannerImage', formData.bannerImage[0]);
    }

    try {
      const response = await axios.post(`${config.BASE_URL}/api/admin/add-project`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        const token = localStorage.getItem('token');
        if (token) {
          navigate('/admin/dashboard');
        } else {
          navigate('/admin/login');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add project');
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="dash_title">Dashboard</h1>
        <div className="main-section">
        <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
          <div className="main-inner add_project_main">
            <form onSubmit={handleAddProject} encType="multipart/form-data">
              <div className="form-login">
              <div className="add_field">
                  <h2>Project Title</h2>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              <div className="add_field">
                  <h2>Project Description</h2>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="add_field">
                  <h2>What we do</h2>
                  <input
                    type="text"
                    name="whatWeDo"
                    value={formData.whatWeDo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="add_field">
                  <h2>Brand Direction</h2>
                  <input
                    type="text"
                    name="brandDirection"
                    value={formData.brandDirection}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="add_field">
                  <h2>Gallery Images</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="images"
                        multiple
                        onChange={handleInputChange}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>
                <div className="add_field">
                  <h2>Banner Image</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="bannerImage"
                        onChange={handleInputChange}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>
                <div className="add_field">
                  <h2>Featured Image</h2>
                  <div className="form-group">
                    <div className="file-upload">
                      <input
                        type="file"
                        className="form-control"
                        name="featuredImage"
                        onChange={handleInputChange}
                        required
                      />
                      <i className="fa fa-camera i-pic-upload"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="add_project">
                <button type="submit">Add Project</button>
              </div>
            </form>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProject;
