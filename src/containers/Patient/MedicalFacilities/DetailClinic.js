import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './DetailClinic.scss'
import {getMedicalFacilitiesById} from '../../../services/userServices';
import ProfileClinic from './profileClinic';
import _ from 'lodash';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/doctorSchedule';
import DoctorExtralnfor from '../Doctor/DoctorExtralnfor';
class DetailClinic extends Component {
     
        
    constructor(props){
        super(props);
        this.state = {
            detailClinic: {},
            arrDoctorId: []
        }
    }
  

    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            
            let res = await getMedicalFacilitiesById({
                id : id
            });

         
            
            if(res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                this.setState({
                    detailClinic: data,
                    arrDoctorId: arrDoctorId
                })

            }
          
        }
     
    }

    async componentDidUpdate (prevProps, prevState, snapshot){
      
    }
  




    render() {
        
     
        let {detailClinic, arrDoctorId} = this.state
        
        return (

            <React.Fragment>
                <HomeHeader />
    

                <div className="clinic-container">
                    <div className="clinic-bg">

                    </div>

                    <div className="clinic-header__menu">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <ProfileClinic 
                        
                                    detailClinic = {detailClinic}
                                    
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="grid wide bg-container mt-5 ">
                        <div className="row">
                                {arrDoctorId && arrDoctorId.length > 0 &&
                                arrDoctorId.map((item, index) => {
                                    return(
                                       
                                    <div className="row doctor">
                                        <div className="col-6 mt-5  m-6 c-12">
                                            <ProfileDoctor 
                                                doctorId = {item}
                                                isShowDescription = {true} />
                                            </div>
                                            

                                        <div className="col-6 body   m-6 c-12 mt-5">
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

                    <div className="container mt-5">
                        <div className="row">
                        <div className="col-12">
                                    
                                    { detailClinic && detailClinic.descriptionHtml &&

                                        <div className="clinic-list"
                                               dangerouslySetInnerHTML={{__html: detailClinic.descriptionHtml }}
                                        >
                                        </div>
                                    }
                               
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
