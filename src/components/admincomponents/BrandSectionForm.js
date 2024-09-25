import React, { useState, useEffect } from 'react';

function BrandSectionForm({ brandSection, onSubmit }) {
  const [brandNameOne, setBrandNameOne] = useState(brandSection?.brandNameOne || '');
  const [brandNameTwo, setBrandNameTwo] = useState(brandSection?.brandNameTwo || '');
  const [brandNameThree, setBrandNameThree] = useState(brandSection?.brandNameThree || '');
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);

  useEffect(() => {
    // Reset form values if brandSection changes (for updating)
    if (brandSection) {
      setBrandNameOne(brandSection.brandNameOne);
      setBrandNameTwo(brandSection.brandNameTwo);
      setBrandNameThree(brandSection.brandNameThree);
    }
  }, [brandSection]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      brandNameOne,
      brandNameTwo,
      brandNameThree,
      imageOne,
      imageTwo,
      imageThree,
      imageFour
    };
    onSubmit(formData);
  };

  return (
      <div className='brand_inner_wrap'>
        <div className='brand_container'>
    <form onSubmit={handleSubmit}>
      <div className='brand_form_wrap'>
      <div className='form_item'>
      <label>Brand Name One:</label>
      <input type="text" value={brandNameOne} onChange={(e) => setBrandNameOne(e.target.value)} />
      </div>
      <div className='form_item'>
      <label>Brand Name Two:</label>
      <input type="text" value={brandNameTwo} onChange={(e) => setBrandNameTwo(e.target.value)} />
      </div>
      <div className='form_item'>
      <label>Brand Name Three:</label>
      <input type="text" value={brandNameThree} onChange={(e) => setBrandNameThree(e.target.value)} />
      </div>
      <div className='form_item'>
      <label>Image One:</label>
      <input type="file" onChange={(e) => setImageOne(e.target.files[0])} />
      </div>
      <div className='form_item'>
      <label>Image Two:</label>
      <input type="file" onChange={(e) => setImageTwo(e.target.files[0])} />
      </div>
      <div className='form_item'>
      <label>Image Three:</label>
      <input type="file" onChange={(e) => setImageThree(e.target.files[0])} />
      </div>
      <div className='form_item'>
      <label>Image Four:</label>
      <input type="file" onChange={(e) => setImageFour(e.target.files[0])} />
      </div>
      <div className='form_submit_btn'>
      <button type="submit">Submit</button>
      </div>
      </div>
    </form>
    </div>
    </div>
  );
}

export default BrandSectionForm;
