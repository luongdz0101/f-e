import React, { useState, useEffect } from 'react';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './HeaderClinic.scss';
import { getAllMedicalFacilities } from '../../../services/userServices';
import DetailsDefault from '../DetailsDefault/DetailsDefault';



const HeaderClinic = () => {
    
    const[arrClinic, setArrClinic] = useState([])
    const[sizeImg, setSizeImg] = useState(false)

    useEffect( async() => {

        let res = await getAllMedicalFacilities()
        setArrClinic(res.data)
        
    }, [])


    return(
        <React.Fragment>
    
            <HomeHeader />

            <DetailsDefault 
                title = 'Danh sách cơ sở y tế...'
                nameLink='detail-clinic'
                arrDetails = {arrClinic}
                setSizeImg = {false}
            />


            <HomeFooter />

        </React.Fragment>

    )
    
    
}



export default (HeaderClinic);

