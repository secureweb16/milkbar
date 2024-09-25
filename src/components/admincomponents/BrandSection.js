import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BrandSectionForm from './BrandSectionForm';
import config from '../../config';

function BrandSection() {
  const [brandSection, setBrandSection] = useState(null);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false); // State to track if updating

  useEffect(() => {
    const fetchBrandSection = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/admin/brandsection`);
        setBrandSection(response.data);
      } catch (err) {
        setBrandSection(null);
      }
    };

    fetchBrandSection();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.BASE_URL}http://localhost:5000/api/admin/brandsection`);
      setBrandSection(null); // Clear the data after deletion
    } catch (err) {
      setError('Failed to delete brand section');
    }
  };
 // Handle form submission for adding new brand section
 const handleAddBooking = async (formData) => {
  const form = new FormData();
  form.append('brandNameOne', formData.brandNameOne);
  form.append('brandNameTwo', formData.brandNameTwo);
  form.append('brandNameThree', formData.brandNameThree);
  if (formData.imageOne) form.append('imageOne', formData.imageOne);
  if (formData.imageTwo) form.append('imageTwo', formData.imageTwo);
  if (formData.imageThree) form.append('imageThree', formData.imageThree);
  if (formData.imageFour) form.append('imageFour', formData.imageFour);

  try {
    // Add new brand section
    await axios.post(`${config.BASE_URL}/api/admin/brandsection`, form);
    window.location.reload();  // Reload after successful submission
  } catch (err) {
    setError('Failed to add new brand section');
  }
};
  const handleUpdate = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append('brandNameOne', updatedData.brandNameOne);
      formData.append('brandNameTwo', updatedData.brandNameTwo);
      formData.append('brandNameThree', updatedData.brandNameThree);

      // If the user uploaded new images
      if (updatedData.imageOne) formData.append('imageOne', updatedData.imageOne);
      if (updatedData.imageTwo) formData.append('imageTwo', updatedData.imageTwo);
      if (updatedData.imageThree) formData.append('imageThree', updatedData.imageThree);
      if (updatedData.imageFour) formData.append('imageFour', updatedData.imageFour);

      await axios.put(`${config.BASE_URL}/api/admin/brandsection`, formData);
      window.location.reload(); // Reload the page to fetch updated data
    } catch (err) {
      setError('Failed to update brand section');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='brand_sec_wrap'>
      {brandSection ? (
        <div className='brand_inner_wrap'>
          <h2>Brand Section</h2>
          <div className='brand_container'>
          <div className='brand_grid'>
            <div className='brand_item'>
            <span>Brand Name One: {brandSection.brandNameOne}</span>
          </div>
          <div className='brand_item'>
          <span>Brand Name Two: {brandSection.brandNameTwo}</span>
          </div>
          <div className='brand_item'>
          <span>Brand Name Three: {brandSection.brandNameThree}</span>
          </div>
          </div>
          <div className='brand_image_wrap'>
            <div className='brand_img_item'>
          <img src={`${config.BASE_URL}/${brandSection.imageOne}`} alt="Image One" />
          </div>
          <div className='brand_img_item'>
          <img src={`${config.BASE_URL}/${brandSection.imageTwo}`} alt="Image Two" />
          </div>
          <div className='brand_img_item'>
          <img src={`${config.BASE_URL}/${brandSection.imageThree}`} alt="Image Three" />
          </div>
          <div className='brand_img_item'>
          <img src={`${config.BASE_URL}/${brandSection.imageFour}`} alt="Image Four" />
          </div>
          </div>
          <div className='brand_edit_btn'>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={() => setIsUpdating(true)}>Edit</button>
          {isUpdating && (
            <button onClick={() => setIsUpdating(false)}>Close</button>
          )}
          
          </div>
          
          {/* Show update form only when updating */}
          {isUpdating && (
            <BrandSectionForm brandSection={brandSection} onSubmit={handleUpdate}  />
          )}
        </div>
        </div>
      ) : (
        <BrandSectionForm brandSection={null} onSubmit={handleAddBooking} />
      )}
    </div>
  );
}

export default BrandSection;
