import React from "react";
import { useNavigate } from "react-router-dom"; 

function DashboardHeader({onLogout}) {
    const navigate = useNavigate();
    const handleLogoutClick = () => {
        onLogout();
        navigate('/admin/login'); 

    }
    return (       
        <nav className="dashboard-nav">
                <div className="logo">
                    <a href="">
                        <span className="fa fa-wordpress"></span>
                    </a>
                </div>
                <ul className="main-nav">
                    <li>
                        <a href="/admin/dashboard">
                            <span className="fa fa-home"></span>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/admin/projects">
                            <span className="fa fa-home"></span>
                            Projects
                        </a>
                    </li>
                    <li>
                        <a href="/admin/brand-section">
                            <span className="fa fa-home"></span>
                            Brand Section 
                        </a>
                    </li>
                    <li>
                    <a onClick={handleLogoutClick} className="logout-btn">
                        <span className="fa fa-sign-out"></span>
                        Logout
                    </a>
                </li>                   
                </ul>
            </nav>
    );
}

export default DashboardHeader;
