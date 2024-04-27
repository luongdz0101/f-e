import React, { Component } from 'react';
import { connect } from 'react-redux';

import './ForYou.scss';
import '../../gird/gird.scss';

import './VideoDoctor.scss';


class VideoDoctor extends Component {

    render() {
      
      
        return (
            <div className="video-doctor-body bg mt-4">
                <div className="video-header">
                    <div className="video-header__text">
                        Truyền thông nói về Booking Care
                    </div>
                </div>
                <div className="video__footer ">
                    <div className="grid wide">
                        <div className="video_body">
                            <div className="row">
                            
                                <div className="col l-6 m-12 c-12">
                                    <div className="video-content">
                                        <iframe  width="592" height="332" className='video' src="https://www.youtube.com/embed/FyDQljKtWnI" title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                                <div className="col l-6 m-0 c-0">
                                    
                                    <div className="row">
                                            <div className="col l-6 c-6 logo-video__container mt-2">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 c-6 logo-video__container mt-2">
                                                <a target='_black' href="https://dantri.com.vn/nhan-tai-dat-viet/san-pham-nen-tang-dat-kham-booking-care-201908201625624751.htm" className='link-video'>
                                                        <div className="img-video1"></div>
                                                </a>
                                            </div>
                                            <div className="col l-6 c-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html" className='link-video'>
                                                        <div className="img-video2"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 c-6 logo-video__container mt-4">
                                                <a target='_black' href="https://infonet.vietnamnet.vn/da-co-hon-20000-luot-benh-nhan-dat-lich-kham-qua-bookingcare-175080.html" className='link-video'>
                                                        <div className="img-video3"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 c-6 logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video4"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 c-6  logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video5"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 c-6  logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video6"></div>
                                                </a>
                                            </div>

                                            <div className="col l-6 c-6   logo-video__container mt-4">
                                                <a target='_black' href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" className='link-video'>
                                                        <div className="img-video"></div>
                                                </a>
                                            </div>
                                    
                                    </div>
                                        
                                            

                                        
                                               
                                </div>
                              
                            </div>
                        </div>  
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VideoDoctor);
