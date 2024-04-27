import React, {useEffect, useState} from 'react';
import './DetailsDefault.scss'
import { withRouter } from 'react-router';
import DetailsModal from '../Doctor/modal/DetailsModal';





const DetailsDefault  = (props) => {

    const {title, nameLink, setSizeImg, modal, arrDetails, setQuestion} = props  
    const[isOpen, setIsOpen] = useState(false)


    const[questionId, setQuestionId] = useState('');

  
    
    const handleViewDetail = (clinic) => {
        props.history.push(`/${nameLink}/${clinic.id}`)
    }

    const handleOnClick = (item) => {
        setIsOpen(true);
        setQuestionId(item.id);
    }

    const close = () => {
        setIsOpen(false);
        
    }
  

 

    
       
        return (

         
           
            <React.Fragment>
          
                <div className="link-container mt  mr-t">
                        <div className="container">

            
                        <div className="row">
                            <div className="col-12">
                                <div className="link-text">{title}</div>
                            </div>

                            
                            
                        </div>
                        </div>
                    
                            <div className="container">
                            


                                {arrDetails && arrDetails.length > 0 &&
                                
                                arrDetails.map((item, index) => {
                                    return (
                                    
                                        
                                    <div className="row mt mt-child"
                                    
                                        onClick={() => modal === true ? handleOnClick(item) : handleViewDetail(item)}
                                    >
                                            
                                                <div className="col-2 ">

                                                
                                                    <div className="detail__img "

                                        

                                                    style={{backgroundImage: `url(${item.image})`,
                                                
                                                    backgroundSize : setSizeImg === true ? 'cover' : 'contain'
                                                
                                                    }}
                                                    
                                                    >

                                                    </div>
                                        
                                                
                                                </div>

                                                <div className="col-10 ">
                                                        <div className="detail__body-text">
                                                    
                                                        <div className="detail__text-up">

                                                            {
                                                                setQuestion === true ? item.question : item.name
                                                            }
                                                          
                                                        </div>
                                                    
                                                        {/* <div className="detail-clinic__dow">
                                                            {item.address}
                                                        </div> */}
                                                    
                                                        </div>
                                                </div>
                                    </div>
                                        
                                        
                                

                                    )
                                })

                                
                                
                                }
                                
                            
                        </div>
                        
                </div>


                {
                    isOpen === true && 
                   <DetailsModal 
                        isOpenModal = {isOpen}
                        closeModal = {close}
                        dataModal = {arrDetails}
                        questionId = {questionId}
                        title = 'Bác sĩ trả lời'
                   />
                   
                }
        

            </React.Fragment>
        );
    
}



export default withRouter (DetailsDefault);
