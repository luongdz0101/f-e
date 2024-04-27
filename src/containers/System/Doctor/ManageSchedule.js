import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import Select from 'react-select';
import { CRUD_ACTIONS, languages, dateFormat } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import {  toast } from 'react-toastify';
import _ from 'lodash'
import { saveBulkScheduleDoctor, getDetailDoctor } from '../../../services/userServices';


class ManageSchedule extends Component {

    constructor(props){
        super(props);
        this.state = {
    
            arrDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            allTimeDoctor: [],
            rangeTime: [],
            doctorId: '',
            roleId: '',
            nameDoctor: ''
  

        }
    }
 

    async componentDidMount () {
        this.props.fetchAllDoctorRedux();
        this.props.fetchAllTimeDoctorRedux();


        let res = await getDetailDoctor(this.props.userInfo.id);
        
        
        this.setState({
            roleId: res.data.roleID,
            nameDoctor: this.buildNameDoctor(res.data)
        })

      
      


       
       
    }

    buildNameDoctor = (data) => {
        let language = this.props.language;
        let labelVi = `${data.lastName} ${data.firstName}`;
        let labelEn = `${data.firstName} ${data.lastName} `;

        let nameDoctor = language === languages.VI ? labelVi : labelEn

        return nameDoctor;
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.allDoctor !== this.props.allDoctor){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                arrDoctor: dataSelect
            })


        }
        if(prevProps.allTimeDoctor !== this.props.allTimeDoctor){
            let data = this.props.allTimeDoctor;

            if(data && data.length > 0){
               data = data.map(item=> ({...item, isSelected: false}))
            }

            this.setState({
                rangeTime: data
            })




        }
      
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props
    
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName} `
                object.label = language === languages.VI ? labelVi : labelEn

                object.value = item.id;
                result.push(object)
            })
           
        }

        return result;
    }

    handleChange = async(selectedOption) => {
        this.setState({ selectedDoctor:  selectedOption});
    };

    handleOnChangeDatePicket = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }


    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if (rangeTime && rangeTime.length > 0){
            let data = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected
                return item;
            })
            this.setState({
                rangeTime: data
            })
        }
    }


    handSaveSchedule = async() => {

     
        let result = [];
        let {rangeTime, selectedDoctor, currentDate, } = this.state;
        let doctorIdOne = this.props.userInfo.id;
        let roleIDUser = this.props.userInfo.roleID;
        if(!currentDate){
            toast.error('Time error!');
            return;
        }
        // if(selectedDoctor && _.isEmpty(selectedDoctor)){
        //     toast.error('Invalid Selected Doctor!');
        //     return;
        // }

        let formattedDate = new Date(currentDate).getTime();
     

        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((time) => {
                    let object = {};
                    object.doctorId =  roleIDUser === 'R2' ? doctorIdOne : selectedDoctor.value //this.props.userInfo.id//;
                    object.date = formattedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                })

                
               
            }else{
                toast.error('Invalid Selected Time!');
                return;
            }
          

           let res = await saveBulkScheduleDoctor({
                arrSchedule: result,
                doctorId: roleIDUser === 'R2' ? doctorIdOne : selectedDoctor.value,
                formattedDate: formattedDate
            });
            
            
            if(res && res.errCode === 0){
                toast.success(' Save info success!');
            }else{
                toast.error('error saveBulkScheduleDoctor!');
            }
            
        }

        
    }

    handleChangeInput = (event) => {
        
    }
    render() {
        let {rangeTime, roleId} = this.state
        let {language} = this.props
     
      

        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));

        console.log(yesterday);
        return (

            <React.Fragment>
               <div className="manage-schedule__container">
                    <div className="m-s-title">
                        <FormattedMessage id = "manage-schedule.title"/>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label> <FormattedMessage id = "manage-schedule.choose-doctor"/></label>
                               {roleId && roleId === 'R1' ? <Select
                            
                                    onChange={this.handleChange}
                                    value={this.state.selectedDoctor}
                                    options={this.state.arrDoctor}
                            
                                />
                                : 
                                    <input type="text" className= 'form-control' 
                                    value={this.state.nameDoctor}
                                    onChange={(event) =>this.handleChangeInput (event)}
                                    />
                                }
                            </div>
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id = "manage-schedule.choose-time"/></label>
                               <DatePicker 
                                    onChange={this.handleOnChangeDatePicket}
                                    className= 'form-control'
                                    value={this.state.currentDate}
                                    minDate = {yesterday}
                          
                               />
                            </div>
                            <div className="col-12 pick-hour">
                             {
                                rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item, index) => {
                                    return(
                                        <button className={item.isSelected === true ? 'btn btn-schedule active': 'btn btn-schedule '}  key={index}
                                        
                                        onClick={() => this.handleClickBtnTime(item)}
                                        >

                                            {language === languages.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                             }
                            </div>

                            <button className='btn btn-primary mt-4 ml-3'
                            onClick={() => this.handSaveSchedule()}
                            
                            ><FormattedMessage id = "manage-schedule.save"/> </button>
                        </div>
                    </div>
               </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctor: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        allTimeDoctor: state.admin.timeDoctor,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllTimeDoctorRedux: () => dispatch(actions.fetchAllTimeDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
