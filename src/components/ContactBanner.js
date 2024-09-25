import React from "react";
import BannerImage from '../assets/images/contact-banner.jpg';
import BannerMobileImage from '../assets/images/contact-banner-mobile.jpg';

function ContactBanner() {
    return (
        <>
        <div className="main_about_banner page_banner inner_page_banner contact_top_banner position-relative">
            <picture>
                <source media="(max-width: 645px)" srcSet={BannerMobileImage} />
                <img src={BannerImage} alt="Logo" />
            </picture>  
            <div className="main_home_banner_content position-absolute w-100 h-100 showonmobile">
                <div className="plr-100 h-100 d-flex align-items-center justify-content-center position-relative">
                    <div className="bannerbox">
                        <div className="home_banner_bottom text-light position-relative">
                            <h1 className="text-white m-0 text-center">Contact us</h1>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        </>
    );
}

export default ContactBanner;
