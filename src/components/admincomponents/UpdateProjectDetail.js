import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';

function UpdateProject() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [project, setProject] = useState({ title:'',description:'', whatWeDo: '', brandDirection: '', images: [] });
    const [newImages, setNewImages] = useState([]);
    const [bannerImage, setBannerImage] = useState(null);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [removeImages, setRemoveImages] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    const fileInputRef = useRef(null);
    const bannerImageRef = useRef(null); // Reference for banner image input
    const featuredImageRef = useRef(null); // Reference for featured image input

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-project/${id}`, { withCredentials: true });
                setProject(response.data); // Set the fetched project details
            } catch (err) {
                setError('Failed to fetch project details');
            }
        };

        fetchProjectDetails();
    }, [id]);

    const handleRemoveImage = async (imageName) => {
        try {
            const response = await axios.post(`${config.BASE_URL}/api/admin/remove-image`, { 
                projectId: project._id, 
                imageName 
            }, { withCredentials: true });
    
            if (response.status === 200) {
                // Remove image from the project state and track it for removal
                setRemoveImages(prev => [...prev, imageName]); // Add to removeImages array
                
                // Update project state
                setProject(prevProject => {
                    const updatedImages = prevProject.images.filter(image => image !== imageName);
                    return {
                        ...prevProject,
                        images: updatedImages,
                        // Check if the removed image was the banner or featured image
                        bannerImage: prevProject.bannerImage === imageName ? null : prevProject.bannerImage,
                        featuredImage: prevProject.featuredImage === imageName ? null : prevProject.featuredImage,
                    };
                });
            } else {
                console.error('Failed to remove image');
            }
        } catch (err) {
            console.error('Error removing image:', err);
        }
    };

    const handleNewImageChange = (e) => {
        setNewImages(e.target.files); // Set new images to be uploaded
    };

    const handleBannerImageChange = (e) => {
        setBannerImage(e.target.files[0]); // Set the banner image
    };

    const handleFeaturedImageChange = (e) => {
        setFeaturedImage(e.target.files[0]); // Set the featured image
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', project.title);
        formData.append('description', project.description);
        formData.append('whatWeDo', project.whatWeDo);
        formData.append('brandDirection', project.brandDirection);

        // Send the images to remove, if any
        if (removeImages.length > 0) {
            formData.append('removeImages', JSON.stringify(removeImages));
        }

        // Add new images for gallery
        for (const image of newImages) {
            formData.append('images', image);
        }

        // Add the banner image if selected
        if (bannerImage) {
            formData.append('bannerImage', bannerImage);
        }

        // Add the featured image if selected
        if (featuredImage) {
            formData.append('featuredImage', featuredImage);
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-project/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // Update the project state with the response data
            if (Array.isArray(response.data)) {
                setProject(response.data.project); // Assuming the response includes the updated project
            } else {
                setError('Unexpected response format');
            }
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear the file input for new images
            }
            if (bannerImageRef.current) {
                bannerImageRef.current.value = ''; // Clear the banner image input
            }
            if (featuredImageRef.current) {
                featuredImageRef.current.value = ''; // Clear the featured image input
            }
            setBannerImage(null); // Reset banner image state
            setFeaturedImage(null); // Reset featured image state
            setSuccessMessage('Project updated successfully!'); 
        } catch (err) {
            setError('Failed to update project');
        }
    };

    return (
        <div className="dashboard update_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Edit Project</h1>
                <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="update_details_wrap">
                    <div className="form-group">
                        <label>Project Title</label>
                        <input
                            type="text"
                            value={project.title}
                            onChange={(e) => setProject({ ...project, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Project description</label>
                        <input
                            type="text"
                            value={project.description}
                            onChange={(e) => setProject({ ...project, description: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>What We Do</label>
                        <input
                            type="text"
                            value={project.whatWeDo}
                            onChange={(e) => setProject({ ...project, whatWeDo: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Brand Direction</label>
                        <input
                            type="text"
                            value={project.brandDirection}
                            onChange={(e) => setProject({ ...project, brandDirection: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        
                        <div className="form-group">
                            <label>Upload Gallery Images</label>
                            <input type="file" multiple onChange={handleNewImageChange} ref={fileInputRef} />
                        </div>
                        <div className="detail_item_inner gallery_inner">
                        <div className="detail_img_grid">
                            {project.images.map((image, index) => (
                                <div className="detail_image_item" key={index}>
                                    <div className="detail_img_item">
                                    <img src={`${config.BASE_URL}${image}`} alt={`Project ${index}`} />
                                    </div>
                                    <button className="remove_btn" type="button" onClick={() => handleRemoveImage(image)}>Remove</button>
                                </div>
                            ))}
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                    <div className="detail_banner_wrap">
                       
                       
                        <div className="detail_img_grid">
                        <div className="upload_item">
                        <label>Banner Image</label>
                    
                            <input type="file" onChange={handleBannerImageChange} ref={bannerImageRef} />
                        </div>
                            {project?.bannerImage ? (
                                <div className="detail_img_item">
                                     <div className="banner_img_wrap">
                                    <img src={`${config.BASE_URL}${project?.bannerImage}`} alt="Banner" />
                                    </div>
                                    <button className="remove_btn" type="button" onClick={() => handleRemoveImage(project?.bannerImage)}>Remove</button>
                                </div>
                            ) : (
                                <p>No image available.</p>
                            )}
                        </div>
                        <div className="detail_img_grid">
                        
                        <div className="upload_item">
                        <label>Featured Image</label>
                            <input type="file" onChange={handleFeaturedImageChange} ref={featuredImageRef} />
                        </div>
                        <div className="detail_img_grid">
                            {project?.featuredImage ? (
                                <div className="detail_img_item">
                                     <div className="banner_img_wrap">
                                    <img src={`${config.BASE_URL}${project?.featuredImage}`} alt="Featured" />
                                    </div>
                                    <button className="remove_btn" type="button" onClick={() => handleRemoveImage(project?.featuredImage)}>Remove</button>
                                </div>
                            ) : (
                                <p>No image available.</p>
                            )}
                        </div>
                        
                    </div>
                       </div>
                    </div>
                   
                   <div className="update_btn_wrap">
                    <button className="update_btn" type="submit">Update Project</button>
                    </div>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    ); 
}

export default UpdateProject;
