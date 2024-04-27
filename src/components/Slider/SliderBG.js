import React, { useState  } from 'react';
import './SliderBG.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const SliderBG = () => {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true
      };
    

    return(


       


        <React.Fragment>
            <div className="body-slider">
            <Slider {...settings}>
                <div className='slider-content'> 
                    <div className="img-slider"></div>
                                            
                </div>
                <div className='slider-content'> 
                    <div className="img-slider-1"></div>
                                            
                </div>
                <div className='slider-content'> 
                    <div className="img-slider-2"></div>
                                            
                </div>
                <div className='slider-content'> 
                    <div className="img-slider-2"></div>                      
                </div>
                </Slider>
            </div>
                
          
        </React.Fragment>
    )
    
}



export default (SliderBG);
