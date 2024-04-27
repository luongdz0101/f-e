import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ForYou.scss'
class ForYou extends Component {

    render() {
        
      
        return (
           < React.Fragment>
                <div className="section-specialty section-doctor">
                    <div className="specialty-content">
                    <div className="grid wide ">
                        <div className="row center">
                            
                            <div className="col-12 header__title--body">
                                    <div className="specialty-header__title">Dành cho bạn</div>
                            </div>
                            <div className="col-4 mt-4">
                                <div className="specialty-content__body">
                                    <div className='specialty-content doctor-container '> 
                                        <div className="specialty-content__img  img_for-you"></div>
                                        
                                        <div className='specialty-content for-you-container__text'>
                                            <span className="for-you_doctor">Bài viết</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 mt-4">
                                <div className="specialty-content__body">
                                    <div className='specialty-content doctor-container '> 
                                        <div className="specialty-content__img  img_for-you"></div>
                                        
                                        <div className='specialty-content for-you-container__text'>
                                            <span className="for-you_doctor">Bài viết</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-4 mt-4">
                                <div className="specialty-content__body">
                                    <div className='specialty-content doctor-container '> 
                                        <div className="specialty-content__img  img_for-you"></div>
                                        
                                        <div className='specialty-content for-you-container__text'>
                                            <span className="for-you_doctor">Bài viết</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        
                        </div>
                    </div>

                    </div>
                </div>
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForYou);
