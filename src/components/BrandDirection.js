import React from "react";
import BrandLogo from '../assets/images/meso.svg';

function brandDirection({project, brandSection}){
   
        return(
            <>
            <div className="brand_direction position-relative">            
                <div className="text-center fw-200">                
                    <h6 className="text-uppercase m-0">Brand Direction</h6>  
                    <div className="dotdivider text-center"><span></span></div>  
                    <p className="font-messina">{project?.brandDirection}</p>
                    <div className="brand_logo d-flex align-items-center justify-content-center nowrap">
                        <div className="common_brand_logo">
                        <div class="brand-text-white">{brandSection?.brandNameOne}</div>
                            {/* <img src={brandSection.brandNameOne} alt="Logo" /> */}
                        </div>
                        <div className="common_brand_logo active">
                        <div class="brand-text-white">{brandSection?.brandNameTwo}</div>
                            {/* <img src={BrandLogo} alt="Logo" /> */}
                        </div>
                        <div className="common_brand_logo">
                        <div class="brand-text-white">{brandSection?.brandNameThree}</div>
                            {/* <img src={BrandLogo} alt="Logo" /> */}
                        </div>
                    </div>
                </div>             
            </div>        
          </>
        );
    
}
export default brandDirection;