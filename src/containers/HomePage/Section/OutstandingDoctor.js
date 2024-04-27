import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './OutstandingDoctor.scss'
import * as actions from '../../../store/actions'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { languages } from '../../../utils';



class OutstandingDoctor extends Component {
  

    constructor(props){
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }
  

    async componentDidMount(){
        this.props.loadTopDoctors();
    }



    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux){
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
       
        this.props.history.push(`/detail-doctor/${doctor.id}`)

    }

    handleOnClickDoctor = () => {
        this.props.history.push(`/header-doctor`)
    }


    
    
   
    render() {
       

        
        let arrDoctor = this.state.arrDoctors;
        // console.log()
        
        
        let {language} = this.props;
    

        return (
            < React.Fragment>
            <div className="doctor-container bg">
                <div className="section-specialty">
                    <div className="grid wide ">
                        <div className="row center">
                            
                            <div className="col-8 header__title--body">
                                    <div className="specialty-header__title"><FormattedMessage id ="home-page.outstanding-doctor"/></div>
                            </div>
                            <div className="col-4 header__button--body">
                                <button type="button" className="btn btn-info specialty-header__button"
                                onClick={() => this.handleOnClickDoctor()}
                                
                                
                                ><FormattedMessage id ="home-page.see-more"/></button>
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
                <div className="grid wide">
                    <Slider {...this.props.settings}>
             

                    {arrDoctor && arrDoctor.length > 0 && arrDoctor.map((item, index) => {

                         let imageBase64 = '';
                        
                         if(item.image){
                             imageBase64 = new Buffer(item.image, 'base64'). toString('binary')
                             
                          
                         }           
                         let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `
                         let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                         return(
                                
                             <div className="specialty-content__body" 
                                onClick={() => this.handleViewDetailDoctor(item)}
                             >
                                 <div className='specialty-content doctor-container__dow'> 
                                     <div className="specialty-content__img img_doctor"
                                    
                                     style={{backgroundImage: `url(${imageBase64})`}}
                                     ></div>
                                    
                                     <div className='specialty-content doctor-container__text'

                                     >
                                         <span className="name_doctor">{language === languages.VI ? nameVi : nameEn}</span>
                                         <div className="department-doctor">{item.Doctor_info.specialtyData.name}</div>
                                     </div>
                                 </div>
                             </div>
                         )


                    })}


                   
                    </Slider>
                </div>
            </div>
            
                    
             
        </React.Fragment>
        )
      
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
       
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
