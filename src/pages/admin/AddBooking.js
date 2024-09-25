import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHeader from '../../components/admincomponents/DashboardHeader';
import AddNewBooking from '../../components/admincomponents/AddBooking';

function AddBooking({onLogout}) {
  return (
    <>
      <DashboardHeader onLogout={onLogout}/>
      <AddNewBooking />            
    </>
  );
}
export default AddBooking;