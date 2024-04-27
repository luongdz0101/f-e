import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import './BookingModal.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _, { times } from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import {  languages } from '../../../../utils/constant';
import {postPatientBooking} from '../../../../services/userServices';
import { Toast, toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay';
import moment from 'moment';




class BookingModal extends Component {
   
        
    constructor(props){
        super(props);
        this.state = {
           fullName: '',
           phoneNumber: '',
           email: '',
           address:'',
           reason: '',
           gender: '',
           doctorId: '',
           birthday: '',
           timeType: '',
           extraInfo: {},
           isShowLoading: false
        }
    }
  


    async componentDidMount(){
        
      
        this.props.fetchGenderStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if( this.props.genderRedux !== prevProps.genderRedux ){
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders &&  arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if( this.props.fetchExtra !== prevProps.fetchExtra ){
           
            this.setState({
 
                extraInfo: this.props.fetchExtra
            })
        }

        if( this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal ){
            if(this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)){
                let doctorId = this.props.dataScheduleTimeModal.doctorId
                
                this.props.fetchExtraDoctor(this.props.dataScheduleTimeModal.doctorId);

                this.setState({
                    doctorId: doctorId,                    
                    timeType: this.props.dataScheduleTimeModal.timeType
                })

            }
            


        }
    }

  

     handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state}

        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }


   
        handleOnChangeDatePicket = (date) => {
            this.setState({
                birthday: date[0]
            })
        }
    
        handleConfirmBooking = async() => {
            this.setState({
                isShowLoading: true
            })
           
            let date = new Date(this.state.birthday).getTime();
            let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
            let nameString = this.buildDoctorName(this.props.dataScheduleTimeModal);
           

            let res = await postPatientBooking({
                fullName: this.state.fullName,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                address:this.state.address,
                reason: this.state.reason,
                doctorId: this.props.dataScheduleTimeModal.doctorId,
                date:this.props.dataScheduleTimeModal.date,
                gender: this.state.gender,
                timeType:  this.props.dataScheduleTimeModal.timeType,
                language: this.props.language,
                timeString: timeString,
                doctorName: nameString
                
            })

            if(res && res.errCode === 0){
                this.setState({
                    isShowLoading: false
                })
                toast.success('Đạt lịch thành công');
                this.props.closeModalBooking();
            }else{
                this.setState({
                    isShowLoading: false
                })
                toast.error('Đặt lịch thật bại')
            }
                
            
        }


        buildDoctorName = (dataTime) => {
            let {language} = this.props;
            if(dataTime && !_.isEmpty(dataTime)){
                let name = language === languages.VI ?  ` ${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}` 
                :
               
                `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}` 
                return name
            }
        }

        buildTimeBooking = (dataTime) => {

            let {language} = this.props
            if(dataTime && !_.isEmpty(dataTime)){
                let data = language === languages.VI ? moment(new Date()).format('dddd - DD/MM/YYYY')
                :
                moment(new Date()).locale('en').format('ddd - DD/MM/YYYY')
                
    
                let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
                
                return   `${time} - ${data}`
    
    
                
            }
            return ''
           
        }
    render() {


   
     
        let language = this.props.language;
        let genders = this.state.genderArr;
        let extraInfo = this.state.extraInfo;
   
        
        let {isOpenModalBooking, closeModalBooking, dataScheduleTimeModal} = this.props

     
       
       let today = new Date()
       
     

        let doctorId = '';
        if(dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)){
            doctorId = dataScheduleTimeModal.doctorId
        }

      


        return (

            <React.Fragment>
               
             
               <Modal isOpen={isOpenModalBooking} 
               
               className='booking-modal-body'
               size='lg'
               centered
               >

                    <LoadingOverlay
                        active={this.state.isShowLoading}
                        spinner
                        text='Loading your ...'
                        >
                
                    </LoadingOverlay>
                   <div className="booking-modal-container">
                        <div className="booking-modal-header">
                            <span className='left'>Thông tin đặt lịch khám bệnh</span>
                           <span className="right"
                           onClick={closeModalBooking}
                           
                           > <i className='fas fa-times'></i></span>
                        </div>

                        <div className="booking-modal-childe__body">
                            <div className="doctor-info">
                                <ProfileDoctor 
                                    doctorId = {doctorId}
                                    isShowDescription = {false}
                                    dataTime = {dataScheduleTimeModal}
                                /> 
                            </div>
                            <div className="price">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                    <label class="form-check-label" for="exampleRadios1">
                                        Giá Khám: 
                                        <NumberFormat

                                        className="currency"

                                        value={

                                        extraInfo.typePriceData && extraInfo.typePriceData.valueVi 
                                        ? extraInfo.typePriceData.valueVi  : ''} 
                                        displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                    </label>
                                </div>
                                

                            </div>

                            <div className="content mt-4">
                                <div className="row">
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Họ tên</label>
                                        <input type="text"  className='form-control'
                                            value={this.state.fullName}
                                            onChange={(event) =>this.handleOnChangeInput(event, 'fullName')}
                                            placeholder='Nguyễn Văn A'
                                        
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Số điện thoại</label>
                                        <input type="text"  className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={(event) =>this.handleOnChangeInput(event, 'phoneNumber')}
                                            placeholder='0705500...'
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Địa chỉ email</label>
                                        <input type="text"  className='form-control'
                                            value={this.state.email}
                                            onChange={(event) =>this.handleOnChangeInput(event, 'email')}
                                            placeholder='email@gmail.com'

                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Địa liên hệ</label>
                                        <input type="text"  className='form-control'
                                            value={this.state.address}
                                            onChange={(event) =>this.handleOnChangeInput(event, 'address')}
                                            placeholder='Hà Nội'

                                        />
                                    </div>
                                    <div className="col-12 form-group">
                                        <label htmlFor="">Lý do khám</label>
                                        <textarea className="form-control textarea-body" rows="4"
                        
                                            onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                            value={this.state.reason}
                                            placeholder='Tội bị đau...'
                                        >
                                            
                                        </textarea>
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Ngày sinh</label>
                                        <DatePicker 
                                            onChange={this.handleOnChangeDatePicket}
                                            className= 'form-control'
                                            value={this.state.birthday}
                                            placeholder='Ấn chọn ngày sinh'
                                        
                                          
                          
                                        />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="">Chọn giới tính</label>
                                        <select className="form-control"
                                 
                                            onChange={(event) => {this.handleOnChangeInput(event, 'gender')}}
                                          
                                            value={this.state.gender}
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
                                </div>
                            </div>
                        </div>

                        <div className="booking-modal-footer">
                            <button type="button" className="btn btn-modal__one btn-primary "
                            onClick={() => this.handleConfirmBooking()}
                            
                            
                            >Xác nhận </button>
                            <button type="button" className="btn btn-modal__two btn-danger" 
                                onClick={closeModalBooking}
                            >Huỷ</button>
                        </div>
                   </div>
                 
                </Modal>


                
                
             
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,
        fetchExtra: state.admin.extraInfo,
         
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchExtraDoctor: (doctorId) => dispatch(actions.fetchExtraInfo(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
