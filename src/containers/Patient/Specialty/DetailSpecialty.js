import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userServices';
import DoctorSchedule from '../Doctor/doctorSchedule';
import DoctorExtralnfor from '../Doctor/DoctorExtralnfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { dateFilter } from 'react-bootstrap-table2-filter';
import Select from 'react-select';
import _ from 'lodash';
import { languages } from '../../../utils';
import HomeFooter from '../../../containers/HomePage/HomeFooter'

class DetailSpecialty extends Component {

        
    constructor(props){
        super(props);
        this.state = {
           arrDoctorId: [],
           detailSpecialty: {},
           listProvince: [], 
           selectProvince: '',
      
        }
    }
  

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
             let id = this.props.match.params.id;



             let res = await getDetailSpecialtyById({
                id: id,
                location: 'All'
             });
        
             let resProvince = await getAllCodeService("PROVINCE");
            
             if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let  dataSelectPrice = this.buildDataInputSelect(resProvince.data)

        
               
                 this.setState({
                    detailSpecialty: res.data, 
                    arrDoctorId: arrDoctorId,
                    listProvince: dataSelectPrice
                 })
             }
             
        }
     }

    componentDidUpdate(prevProps, prevState, snapshot){
        
      
    }
  

    buildDataInputSelect = (inputData) => {
        let result = [];
        let {language} = this.props
        
        if(inputData && inputData.length > 0){
            inputData.map((item, index) => {
                    let object = {};
                    let labelVi =  `${item.valueVi} ` 
                    let labelEn = `${item.valueEn} `
                    object.label = language === languages.VI ? labelVi : labelEn
    
                    object.value = item.id;
                    object.keyMap = item.keyMap;
                    result.push(object)     
            })
           
        }

        return result;
    }
    

    handleChangeSelect =  async (selectedOption) => {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let location = selectedOption.keyMap;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
             });
        
             let resProvince = await getAllCodeService("PROVINCE");

             if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                let  dataSelectPrice = this.buildDataInputSelect(resProvince.data)

                 this.setState({
                    detailSpecialty: res.data, 
                    arrDoctorId: arrDoctorId,
                    listProvince: dataSelectPrice
                 })
             }
        }
        
        
    }

    render() {
        
        let {arrDoctorId} = this.state
        let {detailSpecialty} = this.state
        let { listProvince} = this.state
   

        
        return (
            
            <React.Fragment>
                 <HomeHeader />
                <div className="detail-specialty-container mt mr-t">
                <div className="grid wide bg-container">
                    <div className="row">

                        <div className="col l-12 m-12 c-12">
                            {detailSpecialty && detailSpecialty.name &&
                                <span className='detail-specialty-span'> Chuyên khoa: {detailSpecialty.name}</span>
                            }
                        </div>
                        <div className="col l-12 m-12 c-12">
                            
                        {detailSpecialty && detailSpecialty.descriptionHtml
                            &&
                            <div dangerouslySetInnerHTML={{__html: detailSpecialty.descriptionHtml }}></div>
                                     
                            
                        }
                        
                        </div>
                    </div>
                </div>

                <div className="grid wide bg-container">
                    <div className="row">
                        <div className="col l-3 m-3 c-12 ">
                        <Select
                                
                                // value={this.state.selectedPrice}
                                options={listProvince}
                                placeholder = {'Toàn Quốc'}
                                name = "selectProvince"
                                onChange={this.handleChangeSelect}
                            
                            />
                        </div>
                    </div>
                </div>
                <div className="grid wide bg-container">
                    <div className="row">
                        {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return(

                                    <div className="row">
                                        <div className="col l-6 m-6 c-12 mt-5">
                                            <ProfileDoctor 
                                            doctorId = {item}
                                            isShowDescription = {true} />
                                            </div>
                                            

                                        <div className="col l-6 m-6 c-12 body mt-5">
                                        <div className="">
                                        <DoctorSchedule
                                            doctorIdFromParent = {item}
                                        />
                                        <div className="mb-4">
                                        <DoctorExtralnfor 
                                            doctorIdFromParent = {item}
                                        />
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                      
                                    )
                                   
                                   
                            
                                })
                                }
                    </div>
                               

                            
                        
                </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
