import React, { useState, useEffect } from 'react';
import BannerImage from '../assets/images/contact-banner.jpg';
import BannerMobileImage from '../assets/images/contact-banner-mobile.jpg';
import ProjectList from '../components/ProjectList';
import { useParams } from "react-router-dom";
import axios from "axios"; 
import config from '../config';
function Work() {
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
    <div className="main_home_banner page_banner position-relative">
        <picture>
            <source media="(max-width: 645px)" srcSet={BannerMobileImage} />
            <img src={BannerImage} alt="Logo" />
        </picture>
        <div className="main_home_banner_content position-absolute w-100 h-100">
            <div className="plr-100 h-100 d-flex align-items-center justify-content-center position-relative">
                <div className="bannerbox">
                    <div className="home_banner_bottom text-light position-relative">
                        <h1 className="text-white m-0 text-center">Work</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ProjectList projects={projects}/>
    </>
  );
}

export default Work;