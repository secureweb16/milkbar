function WhatWeDo({ project, content }) {
  if (project) {
    return (
      <div className="what_we_do position-relative">            
        <div className="plr-100 text-center fw-200">                
          <h6 className="text-uppercase m-0">What We Do</h6>  
          <div className="dotdivider text-center"><span></span></div>  
          <p>{project?.whatWeDo}</p>
        </div> 
      </div>
    );
  } else {
    return (
      <div className="what_we_do position-relative">            
        <div className="plr-100 text-center fw-200">                
          <h6 className="text-uppercase m-0">What We Do</h6>  
          <div className="dotdivider text-center"><span></span></div>  
          {content ? (
            <ul className="whatwedo-list">
              {content.map((item, index) => (
                <li key={index}>{item.contentlist}</li>
              ))}
            </ul>
          ) : (
            <p>branding & brand direction web and app design development</p>
          )}
        </div>
      </div>
    );
  }
}

export default WhatWeDo;
