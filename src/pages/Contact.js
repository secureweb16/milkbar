import React from "react";
import ContactBanner from '../components/ContactBanner';
import ContactForm from '../components/ContactForm';




function aboutPage() {
  return (
    <div className="aboutpage">
      <ContactBanner />
      <ContactForm />
    </div> 
  );
}

export default aboutPage;