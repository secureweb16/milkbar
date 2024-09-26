import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './assets/css/App.css';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Work from './pages/Work';
import About from './pages/About';
import Project from './pages/Project';
import SocialMedia from './pages/SocialMedia';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './components/admincomponents/AdminLogin';
import ProtectedRoute from './components/admincomponents/ProtectedRoutes';
import AddProject from './pages/admin/AddProject';
import ViewProject from './pages/admin/ViewProject';
import UpdateProject from './pages/admin/UpdateProject';
import AddBooking from './pages/admin/AddBooking';
import ViewBooking from './pages/admin/ViewBooking';
import UpdateBooking from './pages/admin/UpdateBooking';
import BrandSec from './pages/admin/BrandSection';
import ProjectList from './pages/admin/ProjectList';
import Footer from './components/Footer';
import Branding from './pages/Branding';

import AddService from './pages/admin/AddService';
import UpdateService from './pages/admin/UpdateService';
import ViewService from './pages/admin/ViewService';
import ServiceList from './pages/admin/ServiceList';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const isAdminRoute = window.location.pathname.startsWith('/admin');

    // Check for token in localStorage on initial load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
        setIsLoading(false); // Stop loading after checking token
    }, []);

    // Function to handle login and update authentication state
    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    // Function to handle logout and clear token
    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    if (isLoading) {
        // Render nothing or a loading spinner until authentication is confirmed
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <ScrollToTop />
            {!isAdminRoute && <Header />}
            <Routes>
                <Route index element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/project/:id" element={<Project />} />
                {/* <Route path="project" element={<Project />} /> */}
                <Route path="/social-media" element={<SocialMedia />} />
                <Route path="/branding" element={<Branding />} />

                {/* Protected route for the dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <Dashboard onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/projects"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ProjectList onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/brand-section"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <BrandSec onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path="/admin/login" 
                    element={
                        isAuthenticated ? (
                            <Navigate to="/admin/dashboard" />
                        ) : (
                            <AdminLogin onLogin={handleLogin} />
                        )
                    } 
                />
                <Route
                    path="/admin/add-project"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <AddProject onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                     path="/admin/project/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ViewProject onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                     path="/admin/delete-project/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ViewProject onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                     path="/admin/update-project/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <UpdateProject onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                     path="/admin/add-bookings/:projectId"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <AddBooking onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                 <Route
                     path="/admin/get-booking/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ViewBooking onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                 <Route
                     path="/admin/delete-booking/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ViewBooking onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="admin/update-booking/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <UpdateBooking onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/services"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ServiceList onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/add-service"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <AddService onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                
                <Route
                     path="/admin/service/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <ViewService onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />
                <Route
                     path="/admin/update-service/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated}>
                            <UpdateService onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />

            </Routes>
            {!isAdminRoute && <Footer />}
        </BrowserRouter>
    );
}

export default App;
