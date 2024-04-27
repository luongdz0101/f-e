import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss";
import { FormattedMessage } from 'react-intl';
import { getAllMedicalFacilities } from '../../../services/userServices';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    
    constructor(props){
        super(props);
        this.state = {
           
            arrMedicalFacility: [],
     
          
        }
    }
  

    async componentDidMount(){
      
        let res = await getAllMedicalFacilities();
        this.setState({
            arrMedicalFacility: res.data
        })

      
    }




    handleViewDetailClinic = (clinic) => {
       
        this.props.history.push(`/detail-clinic/${clinic.id}`)

    }

    handleOnClickClinic = () => {
        this.props.history.push(`/header-clinic`)
    }

    render() {
        let {arrMedicalFacility, clinicId} = this.state

        return (
            < React.Fragment>
               <div className="medical-facility-container">
               <div className="section-specialty">
                    <div className="grid wide ">
                        <div className="row center">
                            
                            <div className="col-8 header__title--body">
                                    <div className="specialty-header__title"><FormattedMessage id ="home-page.health-facilities"/></div>
                            </div>
                            <div className="col-4 header__button--body">
                                <button type="button" className="btn btn-info specialty-header__button"
                                    onClick={() => this.handleOnClickClinic()}
                                
                                ><FormattedMessage id ="home-page.see-more"/></button>
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
                <div className="grid wide ">
                        <Slider {...this.props.settings}>


                        {arrMedicalFacility && arrMedicalFacility.length > 0 && arrMedicalFacility.map((item, index) => {
 
                        return(
                            <div className="specialty-content__body" 
                            
                                 onClick={() => this.handleViewDetailClinic(item)}
                            >
                            <div className='specialty-content medical-facility-content ab'> 
                                <div className="specialty-content__img medical-content__img" 
                                    style={{backgroundImage: `url(${item.image})`}}
                                
                                ></div>
                                
                                <span className='specialty-content__text'>{item.name}</span>
                            </div>
                        </div>
                           
                        )

                   

                        })}
                        
                        

                   
                    
                    </Slider>
                </div>
               </div>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
