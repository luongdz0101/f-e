import React, { useState, useEffect  } from 'react';
import { getQuestionById } from '../../../../services/userServices';
import {  Modal, ModalHeader, ModalBody } from 'reactstrap';
import './DetailsModal.scss'


const DetailsModal = (props) => {

    let {isOpenModal, closeModal, questionId, title } = props
    const[dataModal, setDataModal] = useState('');



    useEffect (async() => {

        let res = await getQuestionById({
            id: questionId
        });

  
        let data = res.data;
        if(res && res.errCode === 0){
            setDataModal(data);
        }
    }, [])
    return(

        
        <React.Fragment>
               
            <Modal isOpen={isOpenModal} 
                size='xl'
                
            >
                <ModalHeader toggle={closeModal}>{title}</ModalHeader>
                <ModalBody>
                  <div className="body-QA">
                        <div className="title">Câu hỏi: </div>
                        <div className="nd">
                            {dataModal.question}
                        </div>

                        <div className="title">Trả lời: </div>
                        <div className="nd">
                            {dataModal.reply}
                        </div>
                  </div>
                </ModalBody>
                
            </Modal>
        </React.Fragment>
    )
    
}



export default (DetailsModal);
