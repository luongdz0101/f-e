import React, { useState, useEffect } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './HeaderSpecialty.scss';
import { getAllSpecialty } from '../../../services/userServices';
import DetailsDefault from '../DetailsDefault/DetailsDefault';
import { search } from '../../../services/userServices';
import InputForm from '../../../components/InputFrom/InputForm';


const HeaderSpecialty = () => {
    
    const[arrSpecialty, setArrSpecialty] = useState([])
    const[isOpenInput, setIsOpenInput] = useState(false)
    const [inputs, setInputs] = useState('All')

    useEffect( async() => {

        if(inputs === '') {
            setInputs('All')
        }

        let res = await search({
            search: inputs
        })
        setArrSpecialty(res.data)
        
        
    },[inputs])

    const handleChange = e => {
    
        setInputs(e.target.value)
      
        // setInputs(prevState => ({ ...prevState, [value.name] : value.value }));
        console.log(inputs)
    } 


    return(
        <React.Fragment>
          
            <HomeHeader />
            <div className="container">
               
                    <div className="col-12">
                    <div className="form-group m-top">
                        <input type="text"  className='form-control'
                                placeholder="Tìm kiếm theo chuyên khoa"
                                onChange={(e) => handleChange(e)}
                        />
                        </div>
                    </div>
                
            </div>
            <DetailsDefault 
                title = 'Danh sách chuyên khoa......'
                nameLink='detail-specialty'
                arrDetails = {arrSpecialty}
                setSizeImg = {true}
                setIsOpenInput = {true}
            
            />


            <HomeFooter />

        </React.Fragment>

    )
    
    
}



export default (HeaderSpecialty);


