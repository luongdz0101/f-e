import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import '../../gird/gird.scss'
import {getDetailDoctor} from '../../../services/userServices'
import { languages } from '../../../utils';
import DoctorSchedule from './doctorSchedule';
import HomeFooter from '../../HomePage/HomeFooter'
import DoctorExtralnfor from './DoctorExtralnfor';


class DetaiDoctor extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1
        }
    }
  

    async componentDidMount(){
       if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;

            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailDoctor(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data,
                   
                })
            }
            
       }
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




    render() {
        let{language} = this.props;
    
        let {detailDoctor} = this.state;
         let nameVi = '', nameEn = ''
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        
      
        return (

            <React.Fragment>
                <HomeHeader isShowBanner = {false}/>

               <div className="body">
                    <div className="detail-container__one">
                       
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-2 m-3 c-2">
                                    <div className="container__one-left"

                                    style={{backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}>
                                    
                                    </div>
                                </div>
                                <div className="col l-7 m-6 c-8">
                                    <div className="container__one-right">
                                    <div className="container__one-right-up">
                                        <span className='container__one-right-up__text'>
                                            {language === languages.VI ? nameVi : nameEn}
                                        </span>
                                            
                                        
                                    </div>
                                    <div className="container__one-right-dow">
                                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                                && <span className='container__one-right-dow__text'>

                                                    {detailDoctor.Markdown.description}
                                                </span>
                                            }
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                            
                                
                    </div>

                    <div className="detail-container__two">
                        <div className="grid wide">
                            <div className="row">
                                <div className="col l-8  m-6 c-12">
                                    <div className="container__two-left">
                            
                                            <DoctorSchedule 
                                                doctorIdFromParent = {this.state.currentDoctorId}
                                            />
                                    </div>
                                </div>  
                                <div className="col l-4  m-6 c-12">
                                    <div className="container__two-right">
                                        <DoctorExtralnfor 
                                         doctorIdFromParent = {this.state.currentDoctorId}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-container__three">
                        <div className="grid wide">
                            <div className="row">
                                <div className="col-8">
                                    <div className="detail-container__three-list">
                                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHtml
                                            &&
                                            <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHtml }}></div>
                                        
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
               
               <div className=""><HomeFooter /></div>
                
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetaiDoctor);
