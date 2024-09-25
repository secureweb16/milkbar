import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import BrandSection from '../../components/admincomponents/BrandSection';

function BrandSec({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <BrandSection />            
    </>
  );
}

export default BrandSec;
