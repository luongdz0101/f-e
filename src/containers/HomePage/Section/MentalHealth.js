import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpecialtyImg from "../../../assets/img-specialty/sieu-am-thai.jpg"

class  MentalHealth extends Component {
   

    render() {
     

        return (
           < React.Fragment>
                <div className="section-specialty bg_1">
                    <div className="section-specialty">
                        <div className="grid wide ">
                            <div className="row center">
                                
                                <div className="col-8 header__title--body">
                                        <div className="specialty-header__title">Sức khoẻ tinh thần</div>
                                </div>
                                <div className="col-4 header__button--body">
                                    <button type="button" className="btn btn-info specialty-header__button"><FormattedMessage id ="home-page.see-more"/></button>
                                </div>
                            
                            </div>
                        </div>
                        
                    </div>

                    <div className="grid wide ">
                        <Slider {...this.props.settings}>
                            <div className="specialty-content__body">
                                <div className='specialty-content'> 
                                    <div className="specialty-content__img img_mental-health"></div>
                                    
                                    <span className='specialty-content__text'>Sức Khỏe tâm thần</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content'> 
                                    <div className="specialty-content__img img_mental-health"></div>
                                    
                                    <span className='specialty-content__text'>Sức Khỏe tâm thần</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content'> 
                                    <div className="specialty-content__img img_mental-health"></div>
                                    
                                    <span className='specialty-content__text'>Sức Khỏe tâm thần</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content'> 
                                    <div className="specialty-content__img img_mental-health"></div>
                                    
                                    <span className='specialty-content__text'>Sức Khỏe tâm thần</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content'> 
                                    <div className="specialty-content__img img_mental-health"></div>
                                    
                                    <span className='specialty-content__text'>Sức Khỏe tâm thần</span>
                                </div>
                            </div>

                            <div className="specialty-content__body">
                                <div className='specialty-content'> 
                                    <div className="specialty-content__img img_mental-health"></div>
                                    <span className='specialty-content__text'>Sức Khỏe tâm thần</span>
                                </div>
                            </div>
    
                           
                        </Slider>
                    </div>
                    
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MentalHealth);
