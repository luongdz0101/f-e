import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomeFooter.scss';
import '../gird/gird.scss';




class HomeFooter extends Component {

    render() {
      
      
        return (
            < React.Fragment>
                <div className="footer-container">
                    <div className="grid wide">
                        <div className="footer-content">
                            <div className="row">
                                <div className="col l-6  c-12">
                                    <div className="footer-content__left">
                                        <div className="left-content">
                                            <div className="content__left-img"></div>
                                            <span className='name-logo'>Booking Care</span>
                                        </div>
                                        
                                         
                                        <div className="content__left-header">
                                            <div className="img-map"></div>
                                            <div className="text-map"></div>
                                        </div>
                                            <div className="content__left-address">
                                        <div className="img-check">203 - Hoàng Gia- Tổ 6- Tân Thịnh- Thái Nguyên</div>
                                            <div className="text-map">Phòng khám nhi khoa Hoàng Gia.</div>
                                            <div className="text-map">Hotline: 0972385115</div>
                                        </div>
                                        <div className="content__left-dk"></div>
                                    </div>
                                </div>
                             
                                <div className="col l-6  c-12">
                                    <div className="footer-content-right">
                                        <div className="content-right__header-body">
                                            Đối tác bảo trợ nội dung
                                        </div>
                                        <div className="content-right__header">
                                            Phòng khám nhi khoa Hoàng Gia
                                        </div>
                                        <div className="content-right__footer">
                                            Bảo trợ chuyên mục nội dung y khoa nhỉ
                                        </div>

                                        <div className="content-right__header">
                                            Vinmec 
                                        </div>
                                        <div className="content-right__footer">
                                            Bảo trợ chuyên mục nội dung “Sống khoe suốt đời”
                                        </div>

                                    </div>
                               </div>
                            </div>  
                            
                        </div>
                    </div>
                </div>
                <div className="footer-end">
                     <div className="grid wide">
                        <div className="footer-end-content">
                            <div className="row footer-center">
                                <div className="col l-6 c-12 m-6">
                                     <div className="text-footer-end">Copy booking care by @2023</div>
                                </div>
        
                                <div className="col l-4 c-0 m-6">
                                    <div className="logo_footer">
                                        <div className="img-facebook"></div>
                                        <div className="img-youtube"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
