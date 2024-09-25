import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
import Gallery1 from '../assets/images/gallery-1.jpg';
// import Gallery2 from '../assets/images/gallery-2.jpg';
import Gallery3 from '../assets/images/gallery-3.jpg';
import Video from '../assets/videos/single-projectslider-video.mp4';
import Video2 from '../assets/videos/single-projectslider-video2.mp4';
// import Gallery4 from '../assets/images/gallery-4.jpg';
// import Video from '../assets/videos/reviews-video.mp4';
// import Video2 from '../assets/videos/reviews-video2.mp4';
// import Video3 from '../assets/videos/reviews-video3.mp4';
// import ReviewImage1 from '../assets/images/review-image-1.jpg';
// import ReviewImage3 from '../assets/images/review-image-3.jpg';
// import ReviewImage4 from '../assets/images/review-image-4.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function SingleProjectGallery() {
  const pinContainerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top +=400",
          end: "+=1000",
          scrub: true,
          markers: false,
        }
      });

      tl.to(".gallery_image_1", {
        duration: 1,
        x: 0,
        y: -100,
      }, 0);     
      tl.to(".gallery_image_2", {
        duration: 1,
        x: -300,
        y: -50,
      }, 0);
      tl.to(".gallery_content1", {
        duration: 0.05,
        autoAlpha: 1,
      }, 0.22);
      tl.to(".gallery_content2", {
        duration: 0.005,
        autoAlpha: 1,
      }, 0.30);
      tl.to(".gallery_image_3", {
        duration: 1,
        x: 300,
        y: 0,
      }, 0);
      tl.to(".gallery_image_4", {
        duration: 1,
        x: 0,
        y: -110,
      }, 0);
    });

    return () => {
      ctx.revert();
    };
  }, []);
  return (
    <>
    <div className='home_gallery_block overflow-hidden ptb-120'>      
        <div className="home_gallery_wrapper position-relative pin-container" ref={pinContainerRef}>
          <div className='home_gallery_top'>
            <div className='home_gallery_image position-relative gallery_image_1 z-2'>
            <div className='home_gallery_image_sec'>
              {/* <img src={Gallery2} alt="Gallery" className="w-100 position-absolute" /> */}
              <video width="100%" height="100%" autoPlay muted loop playsInline className='position-absolute top-0 start-0 h-100 w-100 object-fit-cover'>
                <source src={Video} type="video/mp4" />
              </video>
              
              <div className="gallery_content gallery_content1 text-left">
                <h4>“We got <span className="fw-300">3 leads, solid ones,</span> in this morning from that boosted post.”</h4>
                <h6 className='font-14'>SOCIAL CLIENT</h6>
              </div>
              </div>
            </div>
            
          </div>
          <div className='home_gallery_middle d-flex justify-content-center nowrap'>
            <div className='home_gallery_image position-relative gallery_image_2 slide-right'>
              <div className='home_gallery_image_sec'>
                <img src={Gallery1} alt="Gallery" className="w-100 position-absolute" />
              </div>
            </div>
            <div className='home_gallery_image position-relative gallery_image_3 slide-left'>
              <div className='home_gallery_image_sec'>
                <img src={Gallery3} alt="Gallery" className="w-100 position-absolute" />
              </div>
              <div className="gallery_content gallery_content2 text-right">
                <h4>“The ads you’ve run will bring in <span className="fw-300">revenue of 400k for the campaign.</span> It would be stupid not to go harder no? ”</h4>
                <h6 className='font-14'>SOCIAL CLIENT</h6>
              </div>
            </div>
          </div>
          <div className='home_gallery_bottom'>
            <div className='home_gallery_image position-relative gallery_image_4'>
              {/* <img src={Gallery4} alt="Gallery" className="w-100 position-absolute" /> */}
              <video width="100%" height="100%" autoPlay muted loop playsInline className='position-absolute top-0 start-0 h-100 w-100 object-fit-cover'>
                <source src={Video2} type="video/mp4" />
              </video>
            </div>
          </div>
  
        </div>
      </div>
      
    </>
  )
}
