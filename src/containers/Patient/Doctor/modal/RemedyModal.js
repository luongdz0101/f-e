import React, { Component } from 'react';
import { connect } from "react-redux";
import { CommonUtils } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { sendQuestion, getQuestion } from '../../../../services/userServices';

class RemedyModal extends Component {
 
   

    constructor(props){
        super(props);
        this.state = {
           email : '',
       
            reply: '',
            previewImgURL: '',
            imageBase64: this.props.dataModal.image,
            isOpen: false
        }
    }
    openImg = () => {
        if(!this.state.previewImgURL){
            return
        }
        this.setState({
            isOpen: true,
           
        })
    }


    async componentDidMount(){
        
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email

            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if( this.props.dataModal !== prevProps.dataModal ){
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
  

    handleOnChangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            
            this.setState({
              
                imageBase64: base64
            })
        }
        
        
    }
    

    

    handOnchangeReply = (e) => {
        this.setState({
            reply: e.target.value
        })

    }

    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.email
        })
    }

    // sendRemedy = () => {
    //     
    // }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
       
    }

    handleSendEmail = () => {
        let dataReply = this.state.reply;
        let img = this.state.imageBase64;
         this.props.sendEmail(dataReply, img);
         
        
     }
    render() {

        let {isOpenModal, closeModal, dataModal, isReply, isImg, isEmail} = this.props
       
            
        return (

            <React.Fragment>
               
               <Modal isOpen={isOpenModal} 
               
              
               size='xl'
              
               >
                <ModalHeader toggle={closeModal}>Gửi Hoá đơn khám bệnh thành công</ModalHeader>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                           
                                <label htmlFor="">Email bệnh nhân</label>
                                <input className='form-control' type="email" value={this.state.email} 
                                
                                onChange={(event) => {
                                    this.handleOnchangeEmail(event)
                                }}  
                                
                                />
                            
                        </div>
                       

                        {
                            isImg === true && 
                            <div className="col-6 form-group">
                                <div className="mt-4">
                                <label htmlFor="">Chọn file kệt quả khám</label>
                                    <input  type="file"  
                                    onChange={(event) => this.handleOnChangeImg(event)}
                                    />
                                </div>
                           
                               </div>
                            
                      
                        }


                
                          
                          {isReply === true && 
                                 <div className="col-6  form-group">

                                    <div className='label-upload'>

                                    <input id="preview-img" type="file" hidden
                                        onChange={(event) => this.handleOnChangeImg(event)}

                                    />
                                    <label htmlFor="preview-img" className='preview-img'>Tải ảnh <i className="fas fa-upload"></i> </label>

                                    <div className="preview-image"
                                        style={{backgroundImage: `url(${this.state.imageBase64})`}}
                                        onClick={() => this.openImg()}
                                    > 

                                    </div>
                                    </div>
                                 </div>
                      
                            }
                           
                        <div className="col-12 form-group">
                            {isReply === true && 
                                <div className="">
                                    <label htmlFor="">Trả Lời</label>
                                     <textarea className="form-control textarea-body" rows="6"
                                            onChange={ (e) => this.handOnchangeReply(e)}
                                            
                                            
                                   
                                        >

                                    </textarea>
                                </div>
                               
                               
                                
                            }
                        </div>
                            


                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => isEmail === true ? this.handleSendEmail() : this.handleSendRemedy()}>
                        Gửi
                    </Button>{' '}
                    <Button color="secondary" onClick={closeModal}>
                     
                        Hủy bỏ
                    </Button>
                </ModalFooter>
                 
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
