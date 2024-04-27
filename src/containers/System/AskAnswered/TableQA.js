import React, { useState, useEffect  } from 'react';
import { getQuestion, sendQuestion } from '../../../services/userServices';
import RemedyModal from '../../Patient/Doctor/modal/RemedyModal';
import {  toast } from 'react-toastify';

const TableQA = (props) => {
    const [dataQuestion, setDataQuestion] = useState({});
    const[isOpenRemedy, setIsOpenRemedy] = useState(false);
    const [dataModal, setDateModal] = useState([])
    const [isReply, setIsReply] = useState(true)
    const [isImg, setIsImg] = useState(false)
  

    useEffect( async() => {
        
        getDataQuestion()
       
    }, [])
    


    const getDataQuestion = async() => {
        let res = await getQuestion ({
        })

        if(res && res.errCode === 0){
            setDataQuestion(res.data);
         }else{
            setDataQuestion('')
        }
    }

    const handleQA  = (item) => {
        
        let data = {
           
            email: item.email,
            question: item.question,
            fullName: item.fullName,
            phoneNumber: item.phoneNumber,
            image: item.image
        }
        
        setDateModal(data);
        
        setIsOpenRemedy(true);
    }
    
    const sendEmail = async(dataReply, img) => {
        
      
        let res = await sendQuestion({
            email: dataModal.email,
            question: dataModal.question,
            reply: dataReply,
            fullName: dataModal.fullName,
            image: img
        })

        console.log(img);

      

        

    

        if(res && res.errCode == 0){
            setIsOpenRemedy(false)
            toast.success('Gửi câu trả lời thành công')
            getDataQuestion();
           
            
        }else{
            setIsOpenRemedy(false)
            toast.error('Gửi câu trả lời thất bại')
        }
       
    }
     const closeModal = () => {
        setIsOpenRemedy(false)
    }

    return(
        <React.Fragment>
               <div className='question-table'>
                   <table className="table table-dark">
                       <thead>
                           <tr>
                           <th scope="col">#</th>
                           <th scope="col">Email</th>
                           <th scope="col">Question</th>
                           <th scope="col">Actions</th>
                           </tr>
                       </thead>
                       <tbody>

                           <>
                         
                           { dataQuestion && dataQuestion .length > 0 && dataQuestion.map((item, index) => {
                               return(
                                   <tr>
                                       <th scope="row">{index + 1}</th>
                                       <td>{item.email}</td>
                                       <td>{item.question}</td>
                                       <td>    
                                        
                                         
                                                <button type="button" 
                                                className="btn btn-success" 
                                                onClick={() => {
                                                    handleQA(item);
                                                }}

                                              
                                                >Gửi và Thêm</button>
                                        
                                           
                                    
                                       
                        
                                       </td>
                                       
                                               
                                   </tr>     
                               )
                           })}
                                       
                           </>
    
                 
                       </tbody>
                   </table>


               </div>

               {
                isOpenRemedy === true &&
                <RemedyModal 
                    isOpenModal = {isOpenRemedy}
                    dataModal = {dataModal}
                    closeModal= {closeModal}
                    // sendRemedy = {this.sendRemedy}
                    sendEmail = {sendEmail}
                    isReply = {isReply}
                    isImg = {isImg}
                    isEmail = {true}
                />
            }
          
        </React.Fragment>
    )
    
}



export default (TableQA);
