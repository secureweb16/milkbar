import React, { useState, useRef, useEffect } from 'react';
import Item1 from '../assets/images/service-slide-1.jpg';
import Item2 from '../assets/images/gulet.jpeg';
import Item3 from '../assets/images/home-banner.jpg';
import Item4 from '../assets/images/social-media-banner.jpg';
import Item5 from '../assets/images/work-3.jpg';
import LeftArrow from '../assets/images/left-arrow.svg';
import RightArrow from '../assets/images/right-arrow.svg';
import TabArrow from '../assets/images/right_arrow_icon.svg';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-fade';
import "swiper/css/pagination";
// import 'swiper/swiper-bundle.min.css';

import config from '../config';
import axios from 'axios';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Thumbs, FreeMode, Pagination } from 'swiper/modules';


function ServiceTabsPanel() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const mainSwiperRef = useRef(null);
    const [services, setServices] = useState([]);
    const [imageArray, setImageArray] = useState([]);

    const serviceItems = [
        {
            title: 'Consulting',
            description: 'App-like website design for portfolio, e-commerce, hospitality websites, and more.',
            icon: TabArrow, // Ensure TabArrow is imported or defined elsewhere
            image: 'image1.jpg', // Update with actual image path
        },
        {
            title: 'Web and App Design',
            description: 'Creating user-friendly interfaces and engaging experiences.',
            icon: TabArrow,
            image: 'image2.jpg',
        },
        {
            title: 'Branding',
            description: 'Brand design and development from logo design to ground-up concept.',
            icon: TabArrow,
            image: 'image3.jpg',
        },
        {
            title: 'Development',
            description: 'Building scalable and efficient web applications.',
            icon: TabArrow,
            image: 'image4.jpg',
        },
        {
            title: 'Social Media',
            description: 'Creating and managing effective social media strategies.',
            icon: TabArrow,
            image: 'image5.jpg',
        },
    ];

    // const imageArray = [
    //     Item1,
    //     Item2,
    //     Item3,
    //     Item4,
    //     Item5
    // ];
    

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${config.BASE_URL}/api/admin/get-services`, { withCredentials: true });
                var images = [];
                if (Array.isArray(response.data)) {
                    setServices(response.data);  // Set the fetched projects to state

                    Promise.all(response.data.map((item) => {
                        images.push(item.featuredImage);
                    }));

                    setImageArray(images);
                } else {
                    console.log('Unexpected response format');
                }
                // setProjects(response.data); // Set the fetched projects to state
            } catch (err) {
                console.log('Failed to fetch services');
            }
        };

        fetchServices();
    }, []);


    console.log("services: ", services);

    return (
        <>
            <div className="services_tabs_panel position-relative pb-120">
                <h6 className="text-uppercase letter-spacing-5 text-left">Services</h6>
                <div className="service_tabs_wrapper position-relative">
                    {/* <div className='service_tab_items hideonmobile'> */}
                    <div className='service_tab_items' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {services.map((item, index) => (
                            <div
                                className={`service_tab_item ${activeIndex === index ? 'active' : ''}`} // Add 'active' class if current
                                key={index}
                                style={{ margin: '10px 0', cursor: 'pointer' }} // Vertical spacing
                                onClick={() => {
                                    if (mainSwiperRef.current) {
                                        mainSwiperRef.current.slideTo(index);
                                        setActiveIndex(index); // Update active index
                                    } else {
                                        console.error("Swiper reference is not set yet");
                                    }
                                }}
                            >
                                <div className='service-name'>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className='service_desc'>
                                    <span className='icon'>
                                        <img src={TabArrow} alt={`${item.title} Icon`} />
                                    </span>
                                    <span className='text'>
                                        <strong>{item.description}</strong>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                        {/* <Swiper
                            onSwiper={setThumbsSwiper}
                            loop={false}
                            direction={'vertical'}
                            spaceBetween={35}
                            slidesPerView={5}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs]}
                            className="mySwiper"
                        >
                          
                            <SwiperSlide>
                                <div className='service_tab_item'>
                                    <div className='service-name'>
                                        <h3>consulting</h3>
                                    </div>
                                    <div className='service_desc'>
                                        <span className='icon'><img src={TabArrow} alt="Service Image" /></span>
                                        <span className='text'>
                                            <strong>app-like website design</strong> for portfolio, e-commerce, hospitality websites, and more.
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='service_tab_item'>
                                    <div className='service-name'>
                                        <h3>web and app design</h3>
                                    </div>
                                    <div className='service_desc'>
                                        <span className='icon'><img src={TabArrow} alt="Service Image" /></span>
                                        <span className='text'>
                                            <strong>app-like website design</strong> for portfolio, e-commerce, hospitality websites, and more.
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='service_tab_item '>
                                    <div className='service-name'>
                                        <h3>branding</h3>
                                    </div>
                                    <div className='service_desc'>
                                        <span className='icon'><img src={TabArrow} alt="Service Image" /></span>
                                        <span className='text'>
                                            <strong>brand design and development</strong> from logo design to ground-up concept.
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='service_tab_item'>
                                    <div className='service-name'>
                                        <h3>development</h3>
                                    </div>
                                    <div className='service_desc'>
                                        <span className='icon'><img src={TabArrow} alt="Service Image" /></span>
                                        <span className='text'>
                                            <strong>app-like website design</strong> for portfolio, e-commerce, hospitality websites, and more.
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='service_tab_item'>
                                    <div className='service-name'>
                                        <h3>social media</h3>
                                    </div>
                                    <div className='service_desc'>
                                        <span className='icon'><img src={TabArrow} alt="Service Image" /></span>
                                        <span className='text'>
                                            <strong>app-like website design</strong> for portfolio, e-commerce, hospitality websites, and more.
                                        </span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper> */}

                    {/* </div> */}
                    <div className='service_tab_images'>
                        <Swiper
                            ref={mainSwiperRef}
                            loop={false}
                            slidesPerView={1.5}
                            spaceBetween={10}
                            effect={'slide'}
                            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                            modules={[FreeMode, EffectFade, Navigation, Pagination, Thumbs]}
                            centeredSlides={false}
                            pagination={{
                                type: 'progressbar',
                                el: '.swiper-pagination'
                            }}
                            navigation={{ nextEl: ".service-arrow-right", prevEl: ".service-arrow-left" }}
                            breakpoints={{
                                768: {
                                    effect: 'fade',
                                    crossFade: true,
                                    slidesPerView: 1,
                                    allowTouchMove: false,
                                    centeredSlides: true, // Use a colon here
                                },
                                320: {
                                    centeredSlides: true, // Use a colon here
                                    slidesPerView: 1,
                                },
                            }}
                            
                            className="mySwiper2"
                            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                        >
                            {/* Swiper Slides */}
                            {imageArray.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img src={config.BASE_URL + image} alt={`Slide ${index + 1}`} className='hideonmobile' style={{ objectFit: 'contain' }} />
                                    <div className='showonmobile service-tab-mobile'>
                                        <div className='wrapper'>
                                            <div className='tab_content_heading'>
                                                <h3> {services[index].title}</h3>
                                            </div>
                                            <div className='tab_content_wrapper'>
                                                <ul>
                                                    <li>brand direction</li>
                                                    <li>logo + icon design</li>
                                                    <li>photography + videography  direction</li>
                                                    <li>copywriting</li>
                                                </ul>
                                            </div>
                                        </div>   
                                        <div className='mobile_tab_content showonmobile' style={{ backgroundImage: `url(${Item1})` }}>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}

                            {/* <SwiperSlide>
                                <img src={Item1} alt="Service Image" className='hideonmobile'/>
                                <div className='mobile_tab_content showonmobile' style={{ backgroundImage: `url(${Item1})` }}>
                                    <div className='wrapper'>
                                        <div className='tab_content_heading'>
                                            <h3>consulting</h3>
                                        </div>
                                        <div className='tab_content_wrapper'>
                                            <ul>
                                                <li>brand direction</li>
                                                <li>logo + icon design</li>
                                                <li>photography + videography  direction</li>
                                                <li>copywriting</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Item2} alt="Service Image" className='hideonmobile'/>
                                <div className='mobile_tab_content showonmobile' style={{ backgroundImage: `url(${Item2})` }}>
                                    <div className='wrapper'>
                                        <div className='tab_content_heading'>
                                            <h3>web and app design</h3>
                                        </div>
                                        <div className='tab_content_wrapper'>
                                            <ul>
                                                <li>brand direction</li>
                                                <li>logo + icon design</li>
                                                <li>photography + videography  direction</li>
                                                <li>copywriting</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Item3} alt="Service Image" className='hideonmobile'/>
                                <div className='mobile_tab_content showonmobile' style={{ backgroundImage: `url(${Item3})` }}>
                                    <div className='wrapper'>
                                        <div className='tab_content_heading'>
                                            <h3>branding</h3>
                                        </div>
                                        <div className='tab_content_wrapper'>
                                            <ul>
                                                <li>brand direction</li>
                                                <li>logo + icon design</li>
                                                <li>photography + videography  direction</li>
                                                <li>copywriting</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Item4} alt="Service Image" className='hideonmobile'/>
                                <div className='mobile_tab_content showonmobile' style={{ backgroundImage: `url(${Item4})` }}>
                                    <div className='wrapper'>
                                        <div className='tab_content_heading'>
                                            <h3>development</h3>
                                        </div>
                                        <div className='tab_content_wrapper'>
                                            <ul>
                                                <li>brand direction</li>
                                                <li>logo + icon design</li>
                                                <li>photography + videography  direction</li>
                                                <li>copywriting</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide> 
                                <img src={Item5} alt="Service Image" className='hideonmobile'/>
                                <div className='mobile_tab_content showonmobile' style={{ backgroundImage: `url(${Item5})` }}>
                                    <div className='wrapper'>
                                        <div className='tab_content_heading'>
                                            <h3>social media</h3>
                                        </div>
                                        <div className='tab_content_wrapper'>
                                            <ul>
                                                <li>brand direction</li>
                                                <li>logo + icon design</li>
                                                <li>photography + videography  direction</li>
                                                <li>copywriting</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide> */}
                        </Swiper>
                    </div>

                    <div className="slider_nav d-flex align-items-center justify-content-center nowrap">
                        <button className="service-arrow-left arrow common_slider_arrow d-flex align-items-center justify-content-center">
                            <img src={LeftArrow} alt="Left Arrow" />
                        </button>
                        <div className="service-swiper-custom-scrollbar swiper-pagination"></div>
                        <button className="service-arrow-right arrow common_slider_arrow d-flex align-items-center justify-content-center">
                            <img src={RightArrow} alt="Right Arrow" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceTabsPanel;
