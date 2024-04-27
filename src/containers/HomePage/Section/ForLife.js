import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ForLife.scss'



class  ForLife extends Component {
    

    render() {
       

        return (
           < React.Fragment>
               
                <div className="section-specialty">
                    <div className="grid wide ">
                        <div className="row center">
                            
                            <div className="col-8 header__title--body">
                                    <div className="specialty-header__title">Sống khoẻ suốt đời</div>
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
                                <a target="_blank"  href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhi/muon-tang-chieu-cao-phai-lam-sao" style={{textDecoration: "none"}}>
                                    <div className='specialty-content for-life-content '> 
                                        <div className="specialty-content__img img_for-life"></div>
                                        
                                        <span className='for-life-content__text'>Muốn tăng chiều cao: Phải làm sao?.....</span>
                                    </div>
                                </a>
                            </div>

                            <div className="specialty-content__body">
                                <a target="_blank" href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhi/cha-me-don-cac-huong-dan-khi-nuoi-con-1-minh/" style={{textDecoration: "none"}}>
                                    <div className='specialty-content for-life-content '> 
                                        <div className="specialty-content__img img_for-life-1"></div>
                                        
                                        <span className='for-life-content__text'>Cha mẹ đơn thân: Các hướng dẫn khi nuôi con 1 mình.....</span>
                                    </div>
                                </a>
                            </div>
                            <div className="specialty-content__body">
                                <a target="_blank" href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhi/tuan-dau-tien-sau-khi-chao-doi-lam-quen-voi-tre/" style={{textDecoration: "none"}}>
                                    <div className='specialty-content for-life-content '> 
                                        <div className="specialty-content__img img_for-life-2"></div>
                                        
                                        <span className='for-life-content__text'>Tuần đầu tiên sau khi chào đời: Làm quen với trẻ.....</span>
                                    </div>
                                </a>
                            </div>

                            <div className="specialty-content__body">
                                <a target="_blank" href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhi/lam-gi-khi-tre-bi-mem-sun-thanh-quan/" style={{textDecoration: "none"}}>
                                    <div className='specialty-content for-life-content '> 
                                        <div className="specialty-content__img img_for-life-3"></div>
                                        
                                        <span className='for-life-content__text'>Làm gì khi trẻ bị mềm sụn thanh quản?....</span>
                                    </div>
                                </a>
                            </div>

                            <div className="specialty-content__body">
                                <a target="_blank" href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/nhi/dieu-tri-nhiem-trung-so-sinh-nao/" style={{textDecoration: "none"}}>
                                    <div className='specialty-content for-life-content '> 
                                        <div className="specialty-content__img img_for-life-4"></div>
                                        
                                        <span className='for-life-content__text'>Điều trị nhiễm trùng sơ sinh thế nào?....</span>
                                    </div>
                                </a>
                            </div>

                            <div className="specialty-content__body">
                                <a target="_blank" href="https://www.vinmec.com/vi/tin-tuc/thong-tin-suc-khoe/san-phu-khoa-va-ho-tro-sinh-san/cac-xet-nghiem-can-lam-de-chan-doan-nhiem-trung-so-sinh-som/?link_type=related_posts" style={{textDecoration: "none"}}>
                                    <div className='specialty-content for-life-content '> 
                                        <div className="specialty-content__img img_for-life-5"></div>
                                        
                                        <span className='for-life-content__text'>Các xét nghiệm cần làm để chẩn đoán nhiễm trùng sơ sinh sớm?....</span>
                                    </div>
                                </a>
                            </div>

                    

                            
                           
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForLife);
