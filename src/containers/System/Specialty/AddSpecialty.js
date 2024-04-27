
import React from 'react';
import { createNewSpecialty } from '../../../services/userServices';
import { toast } from 'react-toastify';
import ManageDefault from '../Admin/ManageDefault';




const AddSpecialty = () => {
    const getDataQuestion = async(data) => {

            let res = await createNewSpecialty ({
                name: data.name,
                image: data.image,
                descriptionHtml: data.descriptionHtml,
                descriptionMarkdown: data.descriptionMarkdown
            })

            if(res && res.errCode === 0){
                toast.success('Lưu thông tin chuyên khoa thành công');
           
            }else{
                toast.error('Lưu thông tin chuyên khoa thất bại')
            }
    
    }
    

 
    return (

     
       
        
        <React.Fragment>

     
            <ManageDefault
                getDataQuestion = {getDataQuestion}
                title = 'Thêm mới chuyên khoa'
                name = 'Tên chuyên khoa'
                placeholder = 'VD: Xương khớp...'
            />
         

        </React.Fragment>
    );

}



export default (AddSpecialty);


