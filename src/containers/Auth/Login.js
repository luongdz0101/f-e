import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';

import { handleLoginApi } from '../../services/userServices';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isShowPassWord: true,
            errMessage: '',
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            userName: event.target.value
        })
     
        
    }
    handleOnChangePassWord =  (event) => {
        this.setState({
            password: event.target.value
        })
      
    }

    handleLogin = async () => {
       this.setState({
            errMessage: ''
       })
        try {
            let data = await handleLoginApi(this.state.userName, this.state.password);
            if(data && data.errCode !==0){
                
                this.setState({
                    errMessage: data.message ,
                })
            }
            if(data && data.errCode ===0){
               this.props.userLoginSuccess(data.user);
            }

        } catch (error) {
            if(error.response){
                if(error.response.data){
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
         
        }
        
    }

    handleShowHidePassWord= () => {
        this.setState({
            isShowPassWord: !this.state.isShowPassWord,
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin()
        }
    }

    render() {
        
        return (
            <div className='login-bg'>
                <div className='login-container'>
                    <h1>Login</h1>
      
                    <div className="form-group ">
                        <label className='label-text' >User Name</label>
                        <input type="text" className="form-control user-" id="formGroupExampleInput" placeholder="User Name"
                        
                        value={this.state.userName}
                        onChange={
                            (event) => {
                                this.handleOnChangeUserName(event)
                            }
                        }
                        
                        />
                    </div>
                    <div className="form-group password">
                        <label className='label-text' >Pass Word</label>
                        
                        <input type={this.state.isShowPassWord ? 'test' : 'password'}
                        className="form-control"  placeholder="Pass Word"
                        
                        onChange={
                            (event) => {
                                this.handleOnChangePassWord(event)
                            }

                        }
                        onKeyDown={(event) => this.handleKeyDown(event)}

                        />
                        <span 
                            onClick={
                                () => {
                                    this.handleShowHidePassWord();
                                }
                            }

                        >
                        <i className={
                            this.state.isShowPassWord ? 'far fa-eye-slash fa-lg': 'far fa-eye fa-lg'
                        }>

                        </i>
                        </span>
                       
                    </div>

                        <div style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>

                    <button className="btn btn-primary btn-login"
                    onClick={
                        () => {
                            this.handleLogin();
                        }
                    }
                    
                    
                    
                    >Login</button>
               
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
     
        // adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
