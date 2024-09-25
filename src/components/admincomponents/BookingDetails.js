import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import config from '../../config';

function BookingDetails() {
    const { id } = useParams(); // Get the project ID from the URL
    const [booking, setBooking] = useState([]); // State to hold bookings
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-booking/${id}`, { withCredentials: true });
                setBooking(response.data); // Set the fetched project details
            } catch (err) {
                // console.log(err);
                setError('Failed to fetch project details');
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${config.BASE_URL}/api/admin/delete-booking/${id}`, { withCredentials: true });
            // Navigate back to the project list or show a success message
            navigate(-1);
        } catch (err) {
            setError('Failed to delete the project');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className="dashboard booking_details_wrap">
            <div className="container">
                <h1 className="dash_title">Dashboard</h1>
                <div className="back_btn_wrap">
                    <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <div className="main-section">
                    <div className="projects">
                        <div className="projects-inner">
                            <div className="detail_item">
                                <h2>Booking Title</h2>
                                <div className="detail_item_inner">
                                    <p>{booking?.title}</p>
                                </div>
                            </div>
                            <div className="detail_item">
                                <h2>Images</h2>
                                <div className="booking_detail_img_grid">
                                    {booking?.images && booking?.images?.length > 0 ? (
                                        booking.images.map((image, index) => (
                                            <div className="detail_img_item" key={index}>
                                                <img src={`${config.BASE_URL}${image}`} alt={`Boking ${index}`} />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No images available.</p>
                                    )}
                                </div>
                            </div>
                            <div className="detail_edit_del">
                                <div className="btn_item">
                                    <button className="detail_btns" onClick={handleDelete}>Delete</button>
                                </div>
                                <div className="btn_item">
                                    <Link to={`/admin/update-booking/${booking._id}`} className="update_detail detail_btns">Edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default BookingDetails;
