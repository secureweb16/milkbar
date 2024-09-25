import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateProjectDetail from '../../components/admincomponents/UpdateServiceDetail';

function UpdateProject({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateProjectDetail />            
    </>
  );
}

export default UpdateProject;
