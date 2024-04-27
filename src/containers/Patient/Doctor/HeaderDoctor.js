import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './HeaderDoctor.scss';
import ProfileClinic from '../MedicalFacilities/profileClinic';
import * as actions from '../../../store/actions';
import { languages } from '../../../utils';


import { withRouter } from 'react-router';


class HeaderDoctor extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            arrDoctors: []
           
        }
    }
  

    async componentDidMount(){

        this.props.loadDoctors()
     
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      
        if(prevProps.doctorsRedux !== this.props.doctorsRedux){

            this.setState({
                arrDoctors: this.props.doctorsRedux
            
            })
        }
    }
  
    handleViewDetailDoctor = (doctor) => {
       
        this.props.history.push(`/detail-doctor/${doctor.id}`)

    }



    render() {
        
        let {arrDoctors} = this.state
        let {language} = this.props;
        console.log(this.props.doctorsRedux)
      
        return (

            <React.Fragment>
                <HomeHeader />
               <div className="clinic-link-container mt mr-t">
                    <div className="container">

          
                    <div className="row">
                        <div className="col-12">
                            <div className="clinic-link-text">Bác sĩ....</div>
                        </div>
                    </div>
                    </div>
                   
                        <div className="container">
                           

                           
                            {arrDoctors && arrDoctors.length > 0 &&
                            
                            arrDoctors.map((item, index) => {
                                let imageBase64 = '';

                                if(item.image){
                                    imageBase64 = new Buffer(item.image, 'base64'). toString('binary')
                                }  
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                return (


                                    
                         
                                
                                       
                                <div className="row mt mt-child"
                                
                                    onClick={() => this.handleViewDetailDoctor(item)}
                                >
                                        
                                            <div className="col-2">

                                            
                                                <div className="detail-clinic__doctor"

                                                style={{backgroundImage: `url(${imageBase64})`}}
                                                
                                                >

                                                </div>
                                    
                                            
                                            </div>

                                            <div className=' col-10 ' 

>
                                            <span className="name_doctor">{language === languages.VI ? nameVi : nameEn}</span>
                                            <div className="department-doctor">{item.Doctor_info.specialtyData.name}</div>
                                        </div>
                                </div>
                                     
                                       
                            

                                )
                            })

                            
                            
                            }
                            
                          
                    </div>
                    
               </div>

               <HomeFooter />
    
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderDoctor));
