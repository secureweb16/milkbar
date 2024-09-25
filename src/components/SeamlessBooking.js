import React from 'react';
import SliderItem1 from '../assets/images/athen-seamless-1.jpg';
import LeftArrow from '../assets/images/left-arrow.svg';
import RightArrow from '../assets/images/right-arrow.svg';
import {Link } from "react-router-dom";
import { Navigation, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import config from '../config';


function FeaturedWorkSlider({project}){
    // if (!Array.isArray(project)  ) { 
    //     return (<div></div>);
    // }
    if(project){
        return(
            <div className="bg-white plr-100 text-dark">
                <div className="seamless_booking_slider position-relative z-1 ptb-120">
                    <div className='seamless_booking_head text-center'>
                        <h6 className="text-uppercase letter-spacing-5 font-12 text-center">Web Design + Development</h6>
                        <div class="dotdivider text-center mtb15"><span></span></div>
                        <h2>seamless booking</h2>
                        <p className='font-messina'>We wanted to reference the Greek routes in the brand design while maintaining a simple look and feel to reflect the ease of booking with Meso.</p>
                    </div>
                    <div className="seamless_booking_slider_wrapper position-relative pt-40">
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, A11y, Scrollbar]}
                            freeMode={true}
                            centeredSlides={true}
                            spaceBetween={70}
                            slidesPerView={3}
                            navigation={{ nextEl: ".arrow-right", prevEl: ".arrow-left" }}
                            scrollbar={{ draggable: true, el: '.swiper-custom-scrollbar' }}
                            loop={true}
                            breakpoints={{
                                320: {
                                slidesPerView: 1.2,
                                spaceBetween: 10,
                                centeredSlides: false,
                                },
                                769: {
                                    slidesPerView: 3,
                                    spaceBetween: 60,
                                },
                                1025: {
                                    slidesPerView: 3,
                                    spaceBetween: 70,
                                }
                            }}
                        >               
                         {project?.images && project?.images.length > 0 ? (
                                                project?.images.map((image, index) => (
        
                                                <SwiperSlide>
                                                <div className="seamless_booking_slide  position-relative" key={index}>
                                                <img src={`${config.BASE_URL}${image}`} alt={`Project image ${index}`}  className="object-fit-cover" />
                                                </div>
                                                </SwiperSlide> 
                                                ))
                                            ) : (
                                                <p></p>
                                            )}
                                        
                        </Swiper> 
                        
                        {/* <div className="slider_nav d-flex align-items-center justify-content-center nowrap">                
                            <button className="arrow-left arrow common_slider_arrow d-flex align-items-center justify-content-center"><img src={LeftArrow} alt="Image" /></button>
                            <div className="swiper-custom-scrollbar slider_scrollbar"></div>
                            <button className="arrow-right arrow common_slider_arrow d-flex align-items-center justify-content-center"><img src={RightArrow} alt="Image" /></button>
                        </div> */}
                    </div>       
                </div>
            </div>
          );
    }else{
        return (
        <></>
    )
    }
    
}
export default FeaturedWorkSlider; 