import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from '../../../services/userServices';
import { withRouter } from 'react-router';
class Specialty extends Component {
    constructor(props){
        super(props);
        this.state = {
          
            dataSpecialty: []
        }
    }
  

    async componentDidMount(){
       
        let res = await getAllSpecialty();

      
        if(res && res.errCode === 0){
            this.setState({
                dataSpecialty: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        
    }


    handleViewDetailSpecialty = (specialty) => {
       
        
        this.props.history.push(`/detail-specialty/${specialty.id}`)

    }

    handleOnClickSpecialty = () => {
        this.props.history.push(`/header-specialty`)
    }

    render() {
     
        let dataSpecialty = this.state.dataSpecialty;
        return (
           < React.Fragment>
                <div className="section-specialty">
                    <div className="grid wide ">
                        <div className="row center">
                            
                            <div className="col-8 header__title--body">
                                    <div className="specialty-header__title"><FormattedMessage id ="home-page.specialist"/></div>
                            </div>
                            <div className="col-4 header__button--body">
                                <button type="button" className="btn btn-info specialty-header__button" 
                                    
                                onClick={() => this.handleOnClickSpecialty()}
                                ><FormattedMessage id ="home-page.see-more"/></button>
                            </div>
                          
                        </div>
                    </div>
                    
                </div>
                <div className="grid wide ">
                        <Slider {...this.props.settings}>
                        {dataSpecialty && dataSpecialty.length > 0 && dataSpecialty.map((item, index) => {          
                        return(
                            
                            <div className="specialty-content__body">
                                <div className='specialty-content height-specialty' 
                                
                                onClick={() => this.handleViewDetailSpecialty(item)}
                                > 
                                    <div className="specialty-content__img img_specialty"
                                    style={{backgroundImage: `url(${item.image})`}}
                                    
                                    ></div>
                                    
                                    <span className='specialty-content__text'>{item.name}</span>
                                </div>
                        </div>
                        )


                        })}
                       
                    </Slider>
                </div>
                        
                 
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
 
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
