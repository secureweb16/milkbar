import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';


function UpdateBooking() {
    const { id } = useParams(); // Get the booking ID from the URL
    const navigate = useNavigate();
    const [booking, setBooking] = useState({ title: '', images: '' });
    const [newImage, setNewImage] = useState(null); // State for the new image
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const imageFileInputRef = useRef(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-booking/${id}`, { withCredentials: true });
                setBooking(response.data);
                
            } catch (err) {
                setError('Failed to fetch title image section details');
            }
        };

        fetchBookingDetails();
    }, [id]);


    const handleNewImageChange = (e) => {
        setNewImage(e.target.files[0]); // Set the new image to be uploaded
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', booking.title);

        // Append new image if selected
        if (newImage) {
            formData.append('images', newImage);
        }

        try {
            const response = await axios.put(`${config.BASE_URL}/api/admin/update-booking/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });

            // Update the booking state with the response data
            setBooking(response.data.booking); // Assuming the response includes the updated booking
            if (imageFileInputRef.current) {
                imageFileInputRef.current.value = ''; // Clear the image file input
            }
            setSuccessMessage('Title image section updated successfully!');
        } catch (err) {
            console.log(err);
            setError('Failed to update title image section');
        }
    };

    return (
        <div className="dashboard update_booking_detail">
            <div className="container">
                <h1 className="dash_title">Edit Title Image</h1>
                <div className="back_btn_wrap">
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="update_details_wrap">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={booking.title}
                            onChange={(e) => setBooking({ ...booking, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Images</label>
                        <div className="upload_item">
                       
                        <input type="file" name="images" onChange={handleNewImageChange} ref={imageFileInputRef} />
                    </div>
                        <div className="booking_detail_img_grid">
                            {booking.images && (
                                <div className="detail_img_item">
                                    <img src={`${config.BASE_URL}${booking.images}`} alt="Booking image" />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="update_btn_wrap">
                    <button className="update_btn" type="submit">Update</button>
                    </div>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateBooking;
