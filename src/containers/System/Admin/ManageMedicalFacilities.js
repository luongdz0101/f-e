import React from 'react';
import { createNewMedicalFacilities } from '../../../services/userServices';
import { toast } from 'react-toastify';
import ManageDefault from '../Admin/ManageDefault';



const ManageMedicalFacilities = () => {


        
        const getDataQuestion = async(data) => {

                let res = await createNewMedicalFacilities ({
                    name: data.name,
                    image: data.image,
                    descriptionHtml: data.descriptionHtml,
                    descriptionMarkdown: data.descriptionMarkdown,
                    address: data.address
                })

                if(res && res.errCode === 0){
                    toast.success('Lưu thông tin thành công');
               

                }else{
                    toast.error('Lưu thông tin  thất bại')
                }
        
        }
        

     
        return (

         
           
            
            <React.Fragment>

         
                <ManageDefault 
                    getDataQuestion = {getDataQuestion}
                    title = 'Thêm mới cơ sở y tế'
                    name = 'Tên cơ sở y tế '
                    
                    isOpenInput = {true}
                />

               
             
    
            </React.Fragment>
        );
    
}



export default (ManageMedicalFacilities);
