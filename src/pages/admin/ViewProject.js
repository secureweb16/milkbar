import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
<<<<<<< HEAD
import ProjectDetail from '../../components/admincomponents/ProjectDetails';
=======
import ProjectDetail from '../../components/admincomponents/ServiceDetails';
>>>>>>> 7fcad1be3a79880e0b4f7b1dc07ed8c54c852e58

function ViewProjectDetail({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <ProjectDetail />            
    </>
  );
}

export default ViewProjectDetail;
