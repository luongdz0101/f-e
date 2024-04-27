import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { languages } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions/appActions';
import '../gird/gird.scss';
import { withRouter } from 'react-router';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    handleImgLogo = () =>{
        this.props.history.push(`/home`)
    }


    handleOnClickClinic = () => {
        this.props.history.push(`/header-clinic`)
    }

    handleOnClickSpecialty = () => {
        this.props.history.push(`/header-specialty`)
    }

    handleOnClickDoctor = () => {
        this.props.history.push(`/header-doctor`)
    }

    

    render() {

       
        let language = this.props.language;
        return (
           < React.Fragment>
            <div className="home-header-container">
                <div className="grid wide">
                    <div className="row center">
                        <div className="col l-4 c-8 ">
                            <div className="left-content">
                               
                                <div className="header-logo" 
                                    onClick={() => this.handleImgLogo()}
                                ></div>
                                <span className='name-logo'>Booking Care</span>

                            </div>
                        </div>
                        <div className="col l-6 m-0 c-0">
                            <div className="center-container">
                                <div className='center-content'>
                                    <span 
                                    onClick={() => this.handleOnClickSpecialty()}
                                    > 
                                        <FormattedMessage id ="home-header.specialist"/> 
                                    </span>
                                           
                                </div>           
        
                                <div className='center-content' >
                                    <span onClick={() => this.handleOnClickClinic()}>
                                        <FormattedMessage id ="home-header.health-facility"/> 
                                    </span>
                              
                                </div>           

                                <div className='center-content'>
                                    <span
                                    onClick={() => this.handleOnClickDoctor()}
                                    
                                    > <FormattedMessage id ="home-header.doctor"/></span>
                                          
                                    </div>           
    
                                         
                            </div>
                        </div>
                        <div className="col l-2 c-4 ">
                          
                                <div className="right-content">
                                    <div className="right-content-support ">
                                        <a href="https://bookingcare.vn/hotro">
                                            <i className="fas fa-question-circle right-content-icon"></i>
                                            <span className='support-text c-0' > <FormattedMessage id ="header-banner.support"/></span>      
                                        </a>
                                                        
                                    </div>

                                    <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}>
                                        <span 
                                        onClick={
                                            () => {
                                                this.changeLanguage(languages.VI)
                                            }
                                        }
                                    
                                        >VN</span>
                          
                                    </div> 

                                    <div className={language === languages.EN ? 'language-en active' : 'language-en'}>
                                        <span
                                        onClick={
                                            () => {
                                                this.changeLanguage(languages.EN)
                                            }
                                        }
                                        >
                                        EN</span>
                            
                                  
                                    </div>
                                </div>

                         
                        </div>
                    </div>
                </div>
            </div> 

            {this.props.isShowBanner === true && 
                <div className="home-header-banner">
                    <div className="header-banner__up">
                        <div className="header-banner__title-one">
                            <FormattedMessage id ="banner.title-one"/>
                        </div>
                        <div className="header-banner__title-tow">
                            <FormattedMessage id ="banner.title-two"/>
                        
                        </div>
                        <div className="header-banner__search "
                        
                        onClick={() => this.handleOnClickSpecialty()}
                        >
                            <i className="fas fa-search banner__search-icon" 

                            ></i>
                            <input type="text" className='banner__search-input'  placeholder='Tìm chuyên khoa khám bệnh'/>
                            
                        </div>
                    </div>
                
                    <div className="header-banner__dow">
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-3 c-0">
                                    <div className="dow__footer-menu">
                                        <div className="footer-menu__img footer-img" ></div>
                                        <span className='footer-menu__title'> <FormattedMessage id ="header-banner.specialized"/></span>
                                    </div>
                                </div>
                                <div className="col l-3 c-0">
                                    <div className="dow__footer-menu">
                                        <div className="footer-menu__img_1 footer-img" ></div>
                                        <span className='footer-menu__title'><FormattedMessage id ="header-banner.remote-examination"/></span>
                                    </div>
                                </div>
                                <div className="col l-3 c-0">
                                    <div className="dow__footer-menu">
                                        <div className="footer-menu__img_2 footer-img" ></div>
                                        <span className='footer-menu__title'><FormattedMessage id ="header-banner.general-examination"/></span>
                                    </div>
                                </div>
                                <div className="col l-3 c-0">
                                    <div className="dow__footer-menu">
                                        <div className="footer-menu__img_3 footer-img" ></div>
                                        <span className='footer-menu__title'><FormattedMessage id ="header-banner.medical-tests"/></span>
                                    </div>
                                </div>
                                
                                
                                
                            </div>
                        </div>

                    
                    </div>
                
                </div>
            }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
