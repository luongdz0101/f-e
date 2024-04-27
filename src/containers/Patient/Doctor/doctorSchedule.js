import React, { Component } from 'react';
import { connect } from "react-redux";
import './doctorSchedule.scss';
import '../../gird/gird.scss';
import moment from 'moment';

import { languages } from '../../../utils';
import { getScheduleDoctor } from '../../../services/userServices';
import BookingModal from './modal/BookingModal';



class doctorSchedule extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            allDay : [],
            allTimes: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
  

    async componentDidMount(){
        
        let{language} = this.props;
        let arrDate = this.getArrDays(language);

        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctor(this.props.doctorIdFromParent, arrDate[0].value);

            this.setState({
                allTimes: res.data ? res.data : []
            })
        }

        if(arrDate && arrDate.length > 0){
            
            this.setState({
                allDay:arrDate,
             
            })
        }

        
        
        
        
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    getArrDays = (language) => {
        let arrDate = [];
        for(let i = 0; i < 7; i++){
            let object = {};
            if(language === languages.VI){
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                }else{
                    let labelVi = moment(new Date()).add(i,'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }

            }else{
                if(i === 0){
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today
                }else{
                    object.label = moment(new Date()).add(i,'days').locale('en').format('ddd - DD/MM');
                }

                
            }


            object.value = moment(new Date()).add(i,'days').startOf('day').valueOf();
            arrDate.push(object);
        }
       

        return arrDate;

        
    }

    async componentDidUpdate (prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){
            let arrDate = this.getArrDays(this.props.language);
            this.setState({
                allDay: arrDate
            })
        }
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
            let arrDate = this.getArrDays(this.props.language);
            let res = await getScheduleDoctor(this.props.doctorIdFromParent, arrDate[0].value);

            this.setState({
                allTimes: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async(event) => {
        if(this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1){
            let doctorId = this.props.doctorIdFromParent;
          
         
            let res = await getScheduleDoctor(doctorId, event.target.value);
          
            if(res && res.errCode === 0){

                this.setState({
                    allTimes: res.data ? res.data : []
                })
            }
         
          
        }
    }


    handleClickScheduleTime = ( time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }

    render() {
        
     
        let{language} = this.props
        let {allDay, allTimes, isOpenModalBooking, dataScheduleTimeModal} = this.state
        
       
        return (



            <React.Fragment>
                <div className="schedule-container">
                    <div className="all-schedule">
                    <select onChange={(event) => this.handleOnChangeSelect(event)}>
                        {allDay && allDay.length> 0 &&
                        allDay.map((item, index) => {
                            return (
                                <option 
                                    value={item.value} 
                                    key={index}>
                                    {item.label}
                                </option>
                            )
                            
                        })}
                        
                    </select>
                    </div>

                    <div className="all-available-time">
                        <div className="text-calender">
                            <span>
                                <i className="fas fa-calendar-alt"></i>
                                Lịch Khám
                            </span>
                        </div>
                        <div className="time-content">
                    
                                {allTimes && allTimes.length > 0 
                                ? allTimes.map((item, index) => {
                                    let timeDisplay = language === languages.VI ? item.timeTypeData.valueVi :
                                    item.timeTypeData.valueEn

                                    return(
                                
                                        <button  className='btn btn-time-schedule'

                                        onClick={() => this.handleClickScheduleTime(item)}
                                        key={index}>{timeDisplay}</button>
                                    )
                                })
                                :
                                <div className="text-no-schedule">Không có lịch hẹn trông thời gian này, vui lòng chọn thời gian khác !</div>
                            
                            }
                                        
                    
                    
                        </div>
                    </div>
                </div>

               
                <BookingModal 
                    isOpenModalBooking={isOpenModalBooking}
                    closeModalBooking={this.closeModalBooking}
                    dataScheduleTimeModal={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(doctorSchedule);
