import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';

function UpdateServiceDetail() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [service, setService] = useState({ title:'',description:'' });
    const [featuredImage, setFeaturedImage] = useState(null);
    const [removeImages, setRemoveImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const featuredImageRef = useRef(null); // Reference for featured image input

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-service/${id}`, { withCredentials: true });
                setService(response.data); // Set the fetched project details
            } catch (err) {
                setError('Failed to fetch service details');
            }
        };

        fetchProjectDetails();
    }, [id]);

    const handleRemoveImage = async (imageName) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-service-image`, { 
                serviceId: service._id, 
                imageName 
            }, { withCredentials: true });
    
            if (response.status === 200) {
                // Remove image from the project state and track it for removal
                setRemoveImages(prev => [...prev, imageName]); // Add to removeImages array
                
                // Update project state
                setService(prevService => {
                    return {
                        ...prevService,
                        featuredImage: prevService.featuredImage === imageName ? null : prevService.featuredImage,
                    };
                });
            } else {
                console.error('Failed to remove image');
            }
        } catch (err) {
            console.error('Error removing image:', err);
        }
    };


    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]); // Set the featured image
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', service.title);
        formData.append('description', service.description);

        // Send the images to remove, if any
        if (removeImages.length > 0) {
            formData.append('removeImages', JSON.stringify(removeImages));
        }

        // Add the featured image if selected
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-service/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            setService(response.data.service);
            
            if (featuredImageRef.current) {
                featuredImageRef.current.value = ''; // Clear the featured image input
            }
            setFeaturedImage(null); // Reset featured image state
            setSuccessMessage('Service updated successfully!'); 
        } catch (err) {
            setError('Failed to update Service');
        }
    };

    return (
        <div className="dashboard update_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Edit Service</h1>
                <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className="update_details_wrap">
                        <div className="form-group">
                            <label>Service Title</label>
                            <input
                                type="text"
                                value={service.title}
                                onChange={(e) => setService({ ...service, title: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Service description</label>
                            <input
                                type="text"
                                value={service.description}
                                onChange={(e) => setService({ ...service, description: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <div className="detail_banner_wrap">
                            
                                <div className="detail_img_grid">
                                
                                <div className="upload_item">
                                <label>Featured Image</label>
                                    <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                                </div>
                                <div className="detail_img_grid">
                                    {service?.featuredImage ? (
                                        <div className="detail_img_item">
                                            <div className="banner_img_wrap">
                                            <img src={`${config.BASE_URL}${service?.featuredImage}`} alt="Featured" />
                                            </div>
                                            <button className="remove_btn" type="button" onClick={() => handleRemoveImage(service?.featuredImage)}>Remove</button>
                                        </div>
                                    ) : (
                                        <p>No image available.</p>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                   
                   <div className="update_btn_wrap">
                    <button className="update_btn" type="submit">Update Service</button>
                    </div>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    ); 
}

export default UpdateServiceDetail;
