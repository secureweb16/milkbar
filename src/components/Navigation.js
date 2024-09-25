import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import MenuArrow from '../assets/images/down_arrow_icon.svg';

function Navigation() {
    const [activeItem, setActiveItem] = useState('');
    const [expandedItem, setExpandedItem] = useState('');
    const handleItemClick = (path) => {
        setActiveItem(path);
        setExpandedItem('');
    };
    const handleMenuIconClick = (path) => {
        setExpandedItem(expandedItem === path ? '' : path);
    };

    return (
        <>
            <nav>
                <ul className="d-flex justify-content-center w-100 list-style-none">
                    <li className={`${activeItem === '/services' ? 'active' : ''} ${expandedItem === '/services' ? 'expanded' : ''}`}>
                        <Link
                            to="#"
                            className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                            onClick={() => handleItemClick('/services')}
                        >
                            Services
                        </Link>
                        <span className="menuicon" onClick={() => handleMenuIconClick('/services')}>
                            <img src={MenuArrow} alt="menu" />
                        </span>
                        <div className="dropdown_menu">
                            <ul>
                                <li className="submenu">
                                    <Link
                                        to="/social-media"
                                        className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                                        onClick={() => handleItemClick('/social-media')}
                                    >
                                        Social Media
                                    </Link>
                                </li>
                                <li className="submenu">
                                    <Link
                                        to="/branding"
                                        className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                                        onClick={() => handleItemClick('/branding')}
                                    >
                                        Branding
                                    </Link>
                                </li>
                                <li className="submenu">
                                    <Link
                                        to="/social-media"
                                        className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                                        onClick={() => handleItemClick('/social-media')}
                                    >
                                        Hospitality
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className={activeItem === '/work' ? 'active' : ''}>
                        <Link
                            to="/work"
                            className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                            onClick={() => handleItemClick('/work')}
                        >
                            Work
                        </Link>
                    </li>
                    <li className={activeItem === '/contact' ? 'active' : ''}>
                        <Link
                            to="/contact"
                            className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                            onClick={() => handleItemClick('/contact')}
                        >
                            Contact
                        </Link>
                    </li>
                    <li className={activeItem === '/about' ? 'active' : ''}>
                        <Link
                            to="/about"
                            className="text-uppercase letter-spacing-5 font-12 font-messina text-white"
                            onClick={() => handleItemClick('/about')}
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Navigation;
