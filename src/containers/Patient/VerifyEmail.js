import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookApp } from '../../services/userServices';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';
import LoadingOverlay from 'react-loading-overlay';

class VerifyEmail extends Component {

        
    constructor(props){
        super(props);
        this.state = {
          
            statusVerify: false,
            errCode : 0,
            isShowLoading: false
        }
    }
  

    async componentDidMount(){
        this.setState({
            isShowLoading: true
        })
        if(this.props.location && this.props.location.search){
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
          

            let res = await postVerifyBookApp({
                token: token,
                doctorId: doctorId
            })

            if(res && res.errCode === 0){
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                    isShowLoading:false
                })
            }else{
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                    isShowLoading:false
                })
            }
        }
        
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
    }
  




    render() {
       
        
      let {statusVerify, errCode} = this.state
        return (

             
            <React.Fragment>
               
                    <HomeHeader isShowBanner = {false}/>
                    <div className="ve">
                    
                {statusVerify == false ? 
                            <div className="">
                                    
                            </div>
                        :
                        <div > 

                                {+errCode === 0 ? 
                                    <div className="verify-container ">
                                        <div className="img-success color-success"></div>
                                        <div className="verify-text">
                                            <FormattedMessage id ="verifyEmail.success"/>
                                        </div>
                                        <div className="verify-text-chile color-success">
                                            <FormattedMessage id ="verifyEmail.chile"/>
                                            <div className="verify-text-chile--one">
                                                <FormattedMessage id ="verifyEmail.thank"/>
                                            </div>
                                        </div>
                                    
                                    </div>
                                
                                
                                :
                                
                
                                <div className="verify-container ">
                                        <div className="img-err"></div>
                                        <div className="verify-text color-failed">
                                            <FormattedMessage id ="verifyEmail.failed"/>
                                        </div>
                                        <div className="verify-text-chile color-failed">
                                            <FormattedMessage id ="verifyEmail.chile-failed"/>
                                            <div className="verify-text-chile--one">
                                                <FormattedMessage id ="verifyEmail.thank"/>
                                            </div>
                                        </div>
                                        
                                </div>
                                }
                        </div>
                        }
                    </div>
        
                    <LoadingOverlay
                        active={this.state.isShowLoading}
                        spinner
                        text='Loading your ...'
                        >
                
                    </LoadingOverlay>
              
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
