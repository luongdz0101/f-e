import React, {useState} from 'react';
import { toast } from 'react-toastify';
import InputForm from '../../../components/InputFrom/InputForm';
import './ManageQA.scss'
import TableQA from './TableQA';
import {  CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import Lightbox from 'react-image-lightbox';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();


const ManageQA = () => {

    


   

   



    

       


  

  

    
 


    
        return (

         
           
            
            <React.Fragment>
                    <div className="m-s-title">
                        Quản lý hỏi đáp
                    </div>
                <div className="container mt-5">
                    <TableQA />
                </div>

               

            
             
    
            </React.Fragment>
        );
    
}



export default (ManageQA);
