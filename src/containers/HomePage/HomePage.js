import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import AnsweredDoctor from './Section/AnsweredDoctor';
import ForYou from './Section/ForYou';
import MentalHealth from './Section/MentalHealth';
import ForLife from './Section/ForLife';
import VideoDoctor from './Section/VideoDoctor';
import HomeFooter from './HomeFooter';
import './Section/Responsive.scss'

import './HomePage.scss'

class HomePage extends Component {
  

    render() {
        // let settings = {
        //     // dots: false,
        //     // infinite: false,
        //     // speed: 500,
        //     // slidesToShow: 3,
        //     // slidesToScroll: 1,
         
        //   };                               

          var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        
            responsive: [
             
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false
                }
              },
              {
                breakpoint: 820,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 920,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  initialSlide: 3
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  initialSlide: 2
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 420,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 400,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          };
      
        return (
            < div>
                <HomeHeader isShowBanner = {true}/>
                <Specialty 
                settings = {settings} />

                 <MedicalFacility
                settings= {settings} />

                <OutstandingDoctor  
                settings= {settings} />

                <AnsweredDoctor
                 settings= {settings}/>

                {/* <ForYou/> */}

                {/* <MentalHealth  
                settings= {settings} /> */}
              
                <VideoDoctor />

                <ForLife  settings= {settings} />

                <HomeFooter/>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
