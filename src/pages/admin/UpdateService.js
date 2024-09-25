import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateServiceDetail from '../../components/admincomponents/UpdateServiceDetail';

function UpdateService({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <UpdateServiceDetail />            
    </>
  );
}

export default UpdateService;
