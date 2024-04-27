import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedDate } from 'react-intl';


class DefaultClass extends Component {

        
    constructor(props){
        super(props);
        this.state = {
           
        }
    }
  

    async componentDidMount(){
     
    }

   
  




    render() {
        
      
        return (

            <React.Fragment>
               <div className="">
                    
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
