import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import ServiceDetails from '../../components/admincomponents/ServiceDetails';

function ViewService({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <ServiceDetails />            
    </>
  );
}

export default ViewService;
