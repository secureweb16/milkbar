import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
<<<<<<< HEAD
import UpdateProjectDetail from '../../components/admincomponents/UpdateProjectDetail';
=======
import UpdateProjectDetail from '../../components/admincomponents/UpdateServiceDetail';
>>>>>>> 7fcad1be3a79880e0b4f7b1dc07ed8c54c852e58

function UpdateProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateProjectDetail />            
    </>
  );
}

export default UpdateProject;
