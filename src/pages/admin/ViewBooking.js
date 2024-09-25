import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import BookingDetail from '../../components/admincomponents/BookingDetails';

function ViewBookingDetail({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <BookingDetail />            
    </>
  );
}

export default ViewBookingDetail;
