import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import UpdateBookingDetail from '../../components/admincomponents/UpdateBookingDetail';

function UpdateBooking({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout} />
      <UpdateBookingDetail />            
    </>
  );
}

export default UpdateBooking;
