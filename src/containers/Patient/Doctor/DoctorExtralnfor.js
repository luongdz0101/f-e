import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import './DoctorExtralnfor.scss'
import { languages } from '../../../utils';

import {getExtraInfoById} from '../../../services/userServices'

import * as actions from '../../../store/actions'

import NumberFormat from 'react-number-format';
class DoctorExtralnfor extends Component {

        
    constructor(props){
        super(props);
        this.state = {
           isShowDetailInfo : false,
           extraInfo: {},
         
        }
    }
  

    async componentDidMount(){
        if(this.props.doctorIdFromParent){
            this.props.fetchExtraDoctor(this.props.doctorIdFromParent);
        }

        
            
        
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        
        if(this.props.doctorIdFromParent !== prevProps.doctorIdFromParent){
          
           
  

        this.props.fetchExtraDoctor(this.props.doctorIdFromParent);
          
     


        
        }
        if(prevProps.fetchExtra !== this.props.fetchExtra){
            this.setState({
                extraInfo: this.props.fetchExtra
            })
        }
    }

   
  


    showHideDetailInfo = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }


    render() {
        
        let isShowDetailInfo = this.state.isShowDetailInfo
        let {extraInfo} = this.state
        let language = this.props
    
     
        return (

            <React.Fragment>
               <div className="doctor-extra-info-container">
                    <div className="doctor-extra-info__up">
                        <div className="extra-info__up--title">Địa Chỉ Khám</div>
                        <div className="extra-info__up--name">
                            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                        </div>
                        <div className="extra-info__up--address">
                            {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}

                        </div>
                    </div>
                    <div className="doctor-extra-info__dow">
                    
                        {isShowDetailInfo === false && 
                            <div className="extra-info__dow--container">
                                Giá Khám: 
                            
                                  <span className='dow--price'>
                                  <NumberFormat

                                        className="currency"

                                        value={

                                        extraInfo.typePriceData && extraInfo.typePriceData.valueVi 
                                        ? extraInfo.typePriceData.valueVi  : ''} 
                                        displayType={'text'} thousandSeparator={true} suffix={'VND'} />
                                  </span>
                                
                                <span
                                    onClick={() => this.showHideDetailInfo(true)}
                                    className='dow--show'
                                >

                                     .Xem chi tiết
                                </span>
                            </div>

                            

                        }

                    {isShowDetailInfo === true && 
                            <div className="price-show-container">
                                
                                <div className="show-container-header">Sức khoẻ tâm thần</div>
                                <div className="show-container-price">Giá khám</div>

                                <div className="show-container-body">
                                    <div className="container-body-text-price">
                                        Giá khám:

                                        
                                    </div>
                                    <div className="container-body-price">

                                            <NumberFormat

                                                    className="currency"

                                                    value={

                                                    extraInfo.typePriceData && extraInfo.typePriceData.valueVi 
                                                    ? extraInfo.typePriceData.valueVi  : ''} 
                                                    displayType={'text'} thousandSeparator={true} suffix={'VND'} />

                                    </div>
                                </div>

                                <div className="container-body__atm">Phòng khám có thanh toán hình thức  '

                                 {   extraInfo.typePaymentData && extraInfo.typePaymentData.valueVi ? extraInfo.typePaymentData.valueVi : ''}' </div>



                                <span
                                    onClick={() => this.showHideDetailInfo(false)}
                                >
                                    Ẩn bảng giá.
                                    
                                </span>
                            </div>

                            

                        }   
                    </div>
               </div>
          
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        fetchExtra: state.admin.extraInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        fetchExtraDoctor: (doctorId) => dispatch(actions.fetchExtraInfo(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtralnfor);
