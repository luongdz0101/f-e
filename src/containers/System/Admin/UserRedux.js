import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';

import * as actions from '../../../store/actions'
import './UserRedux.scss';
import TableManageUser from './TableManageUser';



class UserRedux extends Component {
    constructor(props){
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            editId: ''

        }
    }
  
  
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders &&  arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        //position
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }

        //role
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if(prevProps.listUsers !== this.props.listUsers){
            let arrRole = this.props.roleRedux;
            let arrPosition = this.props.positionRedux;
            let arrGenders = this.props.genderRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                gender: arrGenders &&  arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
                
            })
        }
    }

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
           
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL : objectUrl,
                avatar: base64
            })
        }
        
        
    }

    openImg = () => {
        if(!this.state.previewImgURL){
            return
        }
        this.setState({
            isOpen: true,
           
        })
    }


    handleSaveUser = () => {
        let check = this.checkValidateInput();
        if(check === false) return;
        let {action} = this.state;
        
        if(action === CRUD_ACTIONS.CREATE){
            this.props.createNewUserStart({
                email: this.state.email,
                password: this.state.password, 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleID: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        if(action === CRUD_ACTIONS.EDIT){
            this.props.editUser({
                id: this.state.editId,
                email: this.state.email,
                password: this.state.password, 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roleID: this.state.role,
                phoneNumber: this.state.phoneNumber,
                positionId: this.state.position,
                avatar: this.state.avatar
                
            })
           
        }

    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
        
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email','password','firstName','lastName','phoneNumber','address'];

        for( let i = 0; i < arrCheck.length; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleEditUserFrom = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64'). toString('binary')
        }

  


        this.setState({
            email: user.email,
            password: 'hard code',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleID,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            editId: user.id


        })
    }

    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
 


        let {email,password,firstName,lastName,phoneNumber,address,gender,position,role,avatar} = this.state
        return (
            
        
            <div className="user-redux__container">
                <div className="title">Thêm thông tin</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <FormattedMessage id="manage-user.add"/>
                            </div>
                            <div className="col-6">
                                <label htmlFor=""> <FormattedMessage id="manage-user.email"/></label>
                                <input className='form-control' type="email" 
                                    value={email}
                                    onChange={(event) => {this.onChangeInput(event, 'email')}}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="">  <FormattedMessage id="manage-user.password"/></label>
                                <input className='form-control' type="password" 
                                value={password}
                                onChange={(event) => {this.onChangeInput(event, 'password')}}
                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="">  <FormattedMessage id="manage-user.firstName"/></label>
                                <input className='form-control' type="text" 
                                value={firstName}
                                onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="">  <FormattedMessage id="manage-user.lastName"/></label>
                                <input className='form-control' type="text" 
                                value={lastName}
                                onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">  <FormattedMessage id="manage-user.phone-number"/></label>
                                <input className='form-control' type="text" 
                                value={phoneNumber}
                                onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}
                                />
                            </div>
                            <div className="col-9">
                                <label htmlFor="">  <FormattedMessage id="manage-user.address"/></label>
                                <input className='form-control' type="text" 
                                value={address}
                                onChange={(event) => {this.onChangeInput(event, 'address')}}/>
                            </div>

                            <div className="col-3">
                                <label htmlFor="">  <FormattedMessage id="manage-user.gender"/></label>
                                <select className="form-control"
                                 
                                 onChange={(event) => {this.onChangeInput(event, 'gender')}}
                                value={gender}
                                >

                                    {genders && genders.length > 0 && 
                                        genders.map((item, index) => {
                                            return (
                                                <option keyMap={index}  value={item.keyMap}> 
                                                    {language === languages.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
      
                                  
                                </select>
                            </div>

                            <div className="col-3">
                                <label htmlFor="">  <FormattedMessage id="manage-user.position"/></label>
                                <select className="form-control"
                                 
                                 onChange={(event) => {this.onChangeInput(event, 'position')}}
                                 value={position}
                                >
                                {positions && positions.length > 0 && 
                                        positions.map((item, index) => {
                                            return (
                                                <option keyMap={index} value={item.keyMap} > 
                                                    {language === languages.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className="col-3">
                                <label htmlFor="">  <FormattedMessage id="manage-user.role-id"/></label>
                                <select className="form-control"
                                
                             
                                onChange={(event) => {this.onChangeInput(event, 'role')}}
                                value={role}
                                >
                                {roles && roles.length > 0 && 
                                        roles.map((item, index) => {
                                            return (
                                                <option keyMap={index}  value={item.keyMap}> 
                                                    {language === languages.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                           

                            <div className="col-2">
                                <label htmlFor="">  <FormattedMessage id="manage-user.img"/></label>
                                <div className='label-upload'>

                                    <input id="preview-img" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}
                                    
                                    />
                                    <label htmlFor="preview-img" className='preview-img'>Tải ảnh <i className="fas fa-upload"></i> </label>
                                    
                                    <div className="preview-image"
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={() => this.openImg()}
                                    > 
                                    
                                    </div>
                                </div>
                                
                            </div>

                            <div className="col-12 mt-4">
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"} type="submit"
                                onClick={() => this.handleSaveUser()}
                                >  

                                {this.state.action === CRUD_ACTIONS.EDIT ? 
                                 <FormattedMessage id="manage-user.edit"/>
                                 :
                                 <FormattedMessage id="manage-user.save"/>
                                }
                               
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-4">
                            <TableManageUser 
                                handleEditUserFrom = {this.handleEditUserFrom}
                                action = {this.state.action}
                            />   
                        </div>
                    </div> 
                </div>
                

                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                 } 
                
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
       genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
       roleRedux: state.admin.roles,
       listUsers: state.admin.users
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
      
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUserStart: (data) => dispatch(actions.createNewUserStart(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUser: (data) => dispatch(actions.editUserStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);

								