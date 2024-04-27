import React, { useState, useEffect  } from 'react';
import {  CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-markdown-editor-lite/lib/index.css';
import InputForm from '../../../components/InputFrom/InputForm';
import './ManageDefault.scss'
const mdParser = new MarkdownIt();


const ManageDefault = (props) => {


        const { getDataQuestion, ...rests } = props;
        const [inputs, setInputs] = useState({});
        const [previewImgURL, setPreviewImgURL] = useState('');
        const [imageBase64, setImageBase64] = useState('');
        const [isOpen, setIsOpen] = useState(false);
        const [descriptionHtml, setDescriptionHtml] = useState('');
        const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
        


        const  handleOnChangeImg = async (event) => {
            let data = event.target.files;
            let file = data[0];
            if(file){
                let base64 = await CommonUtils.getBase64(file);
                let objectUrl = URL.createObjectURL(file);

                setPreviewImgURL(objectUrl);
                setImageBase64(base64);
            }
            
            
        }

        const openImg = () => {
           
            if(!setPreviewImgURL){
                return
            }
            setIsOpen(true)
        }


        const handleEditorChange = ({ html, text }) => {
         
            setDescriptionHtml(html)
            setDescriptionMarkdown(text)
         
        }

           
    

        const handleChange = value => {
            setInputs(prevState => ({ ...prevState, [value.name] : value.value }));
          
        } 

      

        
     

       const handleClickSave = () => {
         
            let data = {
                name: inputs.name,
                image: imageBase64,
                descriptionHtml: descriptionHtml,
                descriptionMarkdown: descriptionMarkdown,
                address: inputs.address ? inputs.address : ''
            }
            getDataQuestion(data );
            setInputs({});
            setDescriptionHtml('');
            setDescriptionMarkdown('');
            setPreviewImgURL('');
       }
        return (

         
           
            
            <React.Fragment>

         
                <div className="medical__container">
                    <div className="m-s-title">
                        {props.title}
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                    <label htmlFor="">{props.name} </label>
                                    <InputForm 
                                        name= 'name'
                                        placeholder={props.placeholder}
                                        type="text"
                                        handleOnChange={handleChange}
                                        className="form-control"
                                        value={inputs.name || ''}
                                    />
                            </div>

                            {props.isOpenInput === true &&
                             <div className="col-6 form-group">
                                <label htmlFor=""> Thêm địa trỉ cơ sở y tế </label>
                                    <InputForm 
                                        name= 'address'
                                        placeholder={props.placeholder}
                                        type="text"
                                        handleOnChange={handleChange}
                                        className="form-control"
                                        value={inputs.address || ''}
                                    />
                             </div>
                            
                            
                            
                            }

                            

                            <div className="col-6  form-group">

                                    <label htmlFor="">Ảnh chuyên khoa</label>
                                    <div className='label-upload'>
                                        <input id="preview-img" type="file" className='file-control' hidden
                                            onChange={(event) => handleOnChangeImg(event)}

                                        />
                                        <label htmlFor="preview-img" className='preview-img'>Tải ảnh <i className="fas fa-upload"></i> </label>

                                        <div className="preview-imagee"
                                            style={{backgroundImage: `url(${previewImgURL})`}}
                                            onClick={ openImg}
                                        > 

                                        </div>
                                    </div>
                            </div>

                            <div className="col-12">
                                <MdEditor style={{ height: '500px' }} 
                                        renderHTML={text => mdParser.render(text)} 
                                        onChange={handleEditorChange} 
                                        value={descriptionMarkdown}
                                    /> 
                            </div>
                            <div className="col-12 mt-5">
                                <button className='save-content-specialty btn btn-warning'
                                
                                onClick={handleClickSave}
                                
                                >Lưu thông tin hỏi đáp</button>
                            </div>
                        </div>
                        
                    </div>
                       
                   
                </div>

                {isOpen && 
                    <Lightbox
                        mainSrc={previewImgURL}
                        onCloseRequest={() => setIsOpen(false)}
                    />
                 } 
             
    
            </React.Fragment>
        );
    
}



export default (ManageDefault);
