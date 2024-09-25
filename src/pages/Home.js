import React, { useState, useEffect } from 'react';
import HomeBanner from '../components/HomeBanner';
import WhatWeDo from '../components/WhatWeDo';
import FeaturedWorkSlider from '../components/FeaturedWorkSlider';
// import ServicesSlider from '../components/ServicesSlider';
import ServiceTabsPanel from '../components/ServiceTabsPanel';
import Gallery from '../components/HomeGallery';
import FollowMilkbar from '../components/FollowMilkbar';
import { useParams } from "react-router-dom";
import axios from "axios"; 
import config from '../config';

function App() {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
          const response = await axios.get(`${config.BASE_URL}/api/admin/get-projects`, { withCredentials: true });
          setProjects(response.data); // Set the fetched projects to state
      } catch (err) {
          setError('Failed to fetch projects');
      } finally {
          setLoading(false);
      }
  };
  
    fetchProjects();
  }, [id]);

  return (
    <>
      <HomeBanner />
      <WhatWeDo />
      <FeaturedWorkSlider projects={projects} />
      <Gallery />
      {/* <ServicesSlider /> */}
      <ServiceTabsPanel />
      <FollowMilkbar />            
    </>
  );
}

export default App;
