import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu, communityDoctorMenu, onlineDoctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { USER_ROLE, languages } from '../../utils/constant';


class Header extends Component {

    constructor(props){
        super(props);
        this.state = {

            menuApp: []
        }
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount(){
        let {userInfo} = this.props;
        let menu = [];
        if(userInfo ){
            let role = userInfo.roleID;
        
            if(role === USER_ROLE.ADMIN){
                menu = adminMenu;
           
            }
            if(role === USER_ROLE.DOCTOR){
                menu = doctorMenu;
            }

            if(role === USER_ROLE.CommunityDoctor){
                menu = communityDoctorMenu;
            }
            if(role === USER_ROLE.OnlineDoctor){
                menu = onlineDoctorMenu;
            }
            
        }
        this.setState({
            menuApp: menu
        })

    }
    render() {
        
        const { processLogout, language, userInfo } = this.props;
    

        return (

            
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>


            
                       
                <div className="header-right">

                     <div className="header-text">
                        <span className='header-text__title'>
                            <FormattedMessage id = "home-header.welcome" />,
                            {userInfo && userInfo.firstName ? userInfo.firstName: ''}
                        </span>
                    </div>
                    <div className="languages">
                        <span className={language === languages.VI ? 'language-vi active' : 'language-vi'}
                        onClick={
                            () => {
                                this.handleChangeLanguage(languages.VI)
                            }
                        }
                        >VN</span>
                        <span className={language === languages.EN ? 'language-en active' : 'language-en'}
                         onClick={
                            () => {
                                this.handleChangeLanguage(languages.EN)
                            }
                        }>EN</span>
                    </div>

                   
                   <div className="logout">
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                   </div>
                </div>
                </div>
                {/* nút logout */}
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
      
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
