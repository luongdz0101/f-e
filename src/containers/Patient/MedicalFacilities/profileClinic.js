import React, { Component } from 'react';
import { connect } from "react-redux";
import './profileClinic.scss'


class DefaultClass extends Component {

        
    constructor(props){
        super(props);
        this.state = {
            detailClinic: {}
        }
    }
  

    async componentDidMount(){
        
       
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.detailClinic !== this.props.detailClinic){
            this.setState({
                detailClinic: this.props.detailClinic
            
            })
        }
    }
  




    render() {

        let {detailClinic} = this.state;
       
     
      
        return (

            <React.Fragment>
               <div className="container">
                    
                    <div className="row mt">
                        <div className="col-5">

                        {detailClinic && detailClinic.image && 
                            <div className="detail-clinic__img"

                            style={{backgroundImage: `url(${detailClinic.image})`}}
                            
                            >

                            </div>
                        }
                           
                        </div>

                        <div className="col-7">
                                <div className="detail-clinic__body-text">
                                {detailClinic && detailClinic.name && 
                                <div className="detail-clinic__text-up">
                                    {detailClinic.name}
                                </div>
                                }

                                {detailClinic && detailClinic.address && 
                                <div className="detail-clinic__dow">
                                    {detailClinic.address}
                                </div>
                                }
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
