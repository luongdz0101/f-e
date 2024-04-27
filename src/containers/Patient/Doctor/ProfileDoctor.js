import React, { Component } from 'react';
import { connect } from "react-redux";

import './ProfileDoctor.scss'
import { languages } from '../../../utils';
import {getProfileDoctor} from '../../../services/userServices'
import _ from 'lodash';
import moment from 'moment';
class ProfileDoctor extends Component {

        
    constructor(props){
        super(props);
        this.state = {
           dataProfile: {}
        }
    }
  

    async componentDidMount(){
       let data = await this.getInfoDoctor(this.props.doctorId)
       
        this.setState({
            dataProfile: data
        })

        
     
    }

     getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctor(id);

            if(res && res.errCode === 0){
                result = res.data
            }
        }

        return result;
    }


  

    renderTimeBooking = (dataTime) => {

        let {language} = this.props
        if(dataTime && !_.isEmpty(dataTime)){
            let data = language === languages.VI ? moment(new Date()).format('dddd - DD/MM/YYYY')
            :
            moment(new Date()).locale('en').format('ddd - DD/MM/YYYY')
            

            let time = language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn
            
            return (

                <>
                    <div className='time'>{time} - {data}</div>
                    <div className='time-text'>Đặt lịch miễn phí</div>
    
                </>
            )
        }
       
    }


    render() {
        let{language, isShowDescription, dataTime} = this.props;
        let {dataProfile} = this.state;
    
        let nameVi = '', nameEn = ''
        if(dataProfile && dataProfile.positionData){
           nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
           nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
       
      
        
        return (

            <React.Fragment>
               <div className="detail-dataProfile ">
                    
                      <div className="dataProfile-left">
                            <div className="dataProfile-img"

                            style={{backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`}}>

                            </div>  
                      </div>
                     
                      
                      
                            <div className="dataProfile-right">
                                <div className="dataProfile-right-up">
                                            <span className='dataProfile-right-up__text'>
                                                {language === languages.VI ? nameVi : nameEn}
                                            </span>
                                                
                                            
                                </div>
                                    
                                <div className="dataProfile-right-dow">
                                            {isShowDescription === true ?
                                                    <>


                                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                                                && <span className='dataProfile-right-dow__text'>

                                                                    {dataProfile.Markdown.description}
                                                                </span>
                                                            }
                                                    </>
                                                    :
                                                    <>
                                                        {this.renderTimeBooking(dataTime)}
                                                    </>
                                            }
                                        
                                                
                                </div>
                                
                                <div className="dataProfile-right-footer">

                                    <i className="fas fa-map-marker-alt"></i>

                                    <>

                                        {dataProfile && dataProfile.Doctor_info && dataProfile.Doctor_info.typeProvinceData
                                            && <span className='dataProfile-right-footer__text'>
                                                {dataProfile.Doctor_info.typeProvinceData.valueVi}
                                            </span>
                                        }
                                    </>
                                        


                                                
                                </div>

                            </div> 
                                   
                   </div>
    
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
