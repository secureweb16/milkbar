import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddServiceComp from '../../components/admincomponents/AddService';

function AddService({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddServiceComp />            
    </>
  );
}

export default AddService;
