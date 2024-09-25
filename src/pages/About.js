import React from "react";
import AboutBanner from '../components/AboutBanner';
import Gallery from '../components/HomeGallery';




function aboutPage() {
  return (
    <div className="aboutpage">
      <AboutBanner />
      <Gallery />
    </div> 
  );
}

export default aboutPage;