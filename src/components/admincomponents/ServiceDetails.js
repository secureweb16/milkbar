import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function ServiceDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-service/${id}`, { withCredentials: true });
                setService(response.data); // Set the fetched project details
            } catch (err) {
                setError('Failed to fetch service details');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-service/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate('/admin/services'); 
        } catch (err) {
            setError('Failed to delete the service');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard project_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Dashboard</h1>
                <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <div className="main-section">
                    <div className="projects">
                        <div className="projects-inner">
                        <div className="detail_item">
                        <h2>Service Title</h2>
                            <div className="detail_item_inner">
                                
                                <p>{service?.title}</p>
                            </div>
                            </div>
                        <div className="detail_item">
                        <h2>Service Description</h2>
                            <div className="detail_item_inner">
                                
                                <p>{service?.description}</p>
                            </div>
                            </div>
                            <div className="detail_item">
                                
                                <div className="detail_banner_wrap">
                                <div className="detail_img_grid">
                                    {service?.featuredImage ? ( // No .length because it's a string
                                        <div className="detail_img_item">
                                             <h2>Featured Image</h2>
                                             <div className="banner_img_wrap">
                                            <img src={`${config.BASE_URL}${service?.featuredImage}`} alt="Featured" />
                                            </div>
                                        </div>
                                    ) : (
                                        <p>No image available.</p>
                                    )}
                                
                            
                                </div>
                                </div>
                            </div>
                           
                            <div className="detail_project_btn_wrap">
                            <div className="detail_edit_del">
                                <div className="btn_item">
                                    <button className="detail_btns" onClick={handleDelete}>Delete</button>
                                </div>
                                <div className="btn_item">
                                    <Link to={`/admin/update-service/${service?._id}`} className="update_detail detail_btns">Edit</Link>
                                </div>
                            </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceDetails;
