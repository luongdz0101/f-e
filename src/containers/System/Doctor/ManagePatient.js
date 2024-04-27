import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash'
import {getAllPatientBooking, postSendRemedy} from '../../../services/userServices'
import RemedyModal from '../../Patient/Doctor/modal/RemedyModal';
import {  toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props){
        super(props);
        this.state = {
    
        
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {},
            isOpenRemedy: false,
            dataModal: {},

            isShowLoading: false,
            isImg: true,
            isReply: false
        }
    }
 

    async componentDidMount() {
        
 
        this.getDataPatient();
    }

    getDataPatient = async() => {
        let {language, user} = this.props;
        let {currentDate} = this.state;
        let formatDate = new Date(currentDate).getTime();
        let res = await getAllPatientBooking ({
            doctorId: user.id,
            date : formatDate
        })

        if(res && res.errCode === 0){
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps,prevState) {
        
        
    }

    closeModal = () => {
        this.setState({
            isOpenRemedy: false
        })
    }

  

    

    handleOnChangeDatePicket = (date) => {
        this.setState({
            currentDate: date[0]
        }, async() => {
            
             await this.getDataPatient();
        })
    }



   
    handlePatientRemedy = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData
        }
        

        this.setState({
            isOpenRemedy: true,
            dataModal: data
        })

      
       
    }
        

    sendRemedy =  async (dataChileModal) => {

        this.setState({
            isShowLoading: true
        })
       
        let dataModal = this.state
        
        let res = await postSendRemedy({
            email: dataChileModal.email,
            imgBase64: dataChileModal.imageBase64,
            doctorId: dataModal.dataModal.doctorId,
            patientId: dataModal.dataModal.patientId,
            timeType: dataModal.dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.dataModal.patientName.firstName,
        })

        

    

        if(res && res.errCode == 0){
            this.setState({
                isShowLoading: false
            })
            toast.success('Gửi thông tin khám bệnh thành công')
            await this.getDataPatient();
           
            
        }else{
            this.setState({
                isShowLoading: false
            })
            toast.error('Gửi thông tin khám bệnh thất bại')
        }

   
    }
    
    render() {
     
     
        let dataPatient = this.state

    
        let {isOpenRemedy, dataModal} = this.state

    
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (

            <React.Fragment>
               <div className="manage-schedule__container">
                    <div className="m-s-title">
                        Thông báo kết quả khám
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label > <FormattedMessage id = "manage-schedule.choose-time"/></label>
                               <DatePicker 
                                    onChange={this.handleOnChangeDatePicket}
                                    className= 'form-control'
                                    value={this.state.currentDate}
                                    minDate = {yesterday}
                          
                               />
                            </div>

                            <div className="col-12 form-group">
                            <div className='users-table'>
                   <table className="table table-dark mt-4">
                       <thead>
                           <tr>
                           <th scope="col">#</th>
                           <th scope="col">Họ và tên</th>
                           <th scope="col">Số điện thoại</th>
                           <th scope="col">Giới tính</th>
                           <th scope="col">Địa chỉ</th>
                           <th scope="col">Thời gian đặt lịch khám</th>
                           <th scope="col">Tuỳ chọn</th>


                           </tr>
                       </thead>
                       <tbody>

                        
                                  
                           <>
                         
                         { dataPatient.dataPatient && dataPatient.dataPatient.length > 0 ? dataPatient.dataPatient.map((item, index) => {
                             return(
                                 <tr>
                                     <th scope="row">{index + 1}</th>
                                     <td>{item.patientData.email}</td>
                                      <td>{item.patientData.phoneNumber}</td> 
                                      <td>{item.patientData.genderData.valueVi}</td> 
                                      <td>{item.patientData.address}</td> 
                                      <td>{item.timeTypePatient.valueVi}</td> 
                                     <td>    
                                     <button type="button" 
                                         className="btn btn-success" 
                                         style={{marginRight: 10, paddingRight:10 , paddingLeft: 10}}

                                         onClick={() => {
                                             this.handlePatientRemedy(item);
                                         }}
                                         >Xác Nhận</button>
                                     
                                     </td>
                                             
                                 </tr>     
                             )
                         })
                         
                         :
                         <tr >
                           <td colSpan={7} style={{textAlign: "center"}} > No data</td>
                        </tr>
                         
                         }
                                     
                         </>
  
    
                 
                       </tbody>
                   </table>
               </div>
                            </div>
                          

                            
                        </div>
                    </div>
               </div>
               
                    
            {
                this.state.isOpenRemedy === true &&
                <RemedyModal 
                    isOpenModal = {isOpenRemedy}
                    dataModal = {dataModal}
                    closeModal= {this.closeModal}
                    sendRemedy = {this.sendRemedy}
                    isImg={this.state.isImg}
                    isReply={this.state.isReply}
                />
            }

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
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
        fetchAllTimeDoctorRedux: () => dispatch(actions.fetchAllTimeDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
