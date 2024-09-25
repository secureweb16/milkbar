import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AllServicesList from '../../components/admincomponents/AllServicesList';

function ServiceList({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AllServicesList  />            
    </>
  );
}

export default ServiceList;
