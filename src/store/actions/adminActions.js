import actionTypes from './actionTypes';
import { getAllCodeService, createNewUser, getAllUsers, deleteUser,editUser, getTopDoctorHomeService 
    ,getAllDoctorService,saveDetailDoctor,getAllSpecialty,
     getExtraInfoById, getAllMedicalFacilities} from '../../services/userServices';
import {  toast } from 'react-toastify';
import { get } from 'lodash';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGenderStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }else{
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log(error);
        }
    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData 
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



export const fetchRequiredDoctorStart = () => {

    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRE_DOCTOR_START
            })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllMedicalFacilities()


            if(resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0
                ) {
                    let data = {
                        resPrice: resPrice.data,
                        resPayment: resPayment.data,
                        resProvince: resProvince.data,
                        resSpecialty: resSpecialty.data,
                        resClinic: resClinic.data
                    }

                dispatch(fetchRequiredDoctorSuccess(data));
            }else{
                dispatch(fetchRequiredDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorFailed())
            console.log(error);
        }
    }
}


export const fetchRequiredDoctorSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_FAILED
})



///position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_SUCCESS
            })

            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }else{
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log(error);
        }
    }
}


export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//role
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })

            let res = await getAllCodeService("ROLE");
            if(res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }else{
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log(error);
        }
    }
}


export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})



export const createNewUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
          
            if(res && res.message.errCode === 0) {
                toast.success("Create a new user succeed");
                dispatch(fetchAllUserStart());
                dispatch(saveUserSuccess());
             
            }else{
                toast.error("Create a new user error");
                dispatch(saveUserFailed())
            }
        } catch (error) {
            dispatch(saveUserFailed())
            console.log(error);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    
   
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})




export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if(res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }else{
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
            console.log(error);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
   
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})



export const deleteUserStart = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId);
            if(res && res.errCode === 0) {
                toast.success("Deleted the user succeed");
            
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Deleted the user error");
                dispatch(deleteUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
            console.log(error);
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
  
   
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data);
            if(res && res.errCode === 0) {
                toast.success("Update the user succeed");
            
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Update the user error");
                dispatch(editUserFailed())
            }
        } catch (error) {
            dispatch(editUserFailed())
            console.log(error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
  
   
})

export const editUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService();    
            if(res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            }else{
                dispatch(fetchTopDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchTopDoctorFailed())
            console.log(error);
        }
    }
}

export const fetchTopDoctorSuccess = (data) => ({
    
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    dataDoctor: data

})

export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
    
})



export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            if(res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            }else{
                dispatch(fetchAllDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchAllDoctorFailed())
            console.log(error);
        }
    }
}

export const fetchAllDoctorSuccess = (data) => ({
    
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    dataDR: data

})

export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
    
})


export const saveDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if(res && res.errCode === 0) {
                toast.success("Save Info Doctor succeed")
                dispatch(saveDoctorSuccess());
            }else{
                toast.error("Save Info Doctor error")
                dispatch(saveDoctorFailed())
            }
        } catch (error) {
            toast.error("Save Info Doctor Error")
            dispatch(saveDoctorFailed())
            console.log(error);
        }
    }
}

export const saveDoctorSuccess = () => ({
    
    type: actionTypes.SAVE_DOCTOR_SUCCESS,


})

export const saveDoctorFailed = () => ({
    type: actionTypes.SAVE_DOCTOR_FAILED,
    
})



export const fetchAllTimeDoctor = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
         
            if(res && res.errCode === 0) {
                dispatch(fetchAllTimeDoctorSuccess(res.data));
            }else{
                dispatch(fetchAllTimeDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchAllTimeDoctorFailed())
            console.log(error);
        }
    }
}

export const fetchAllTimeDoctorSuccess = (data) => ({
    
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
   
    dataTime: data
})

export const fetchAllTimeDoctorFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
    
})




export const fetchExtraInfo = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getExtraInfoById(doctorId);
            if(res && res.errCode === 0) {
                dispatch(fetchExtraInfoSuccess(res.data));
            }else{
                dispatch(fetchExtraInfoFailed())
            }
        } catch (error) {
            dispatch(fetchExtraInfoFailed())
            console.log(error);
        }
    }
}

export const fetchExtraInfoSuccess = (data) => ({
    
    type: actionTypes.FETCH_EXTRA_INFO_SUCCESS,
    data: data

})

export const fetchExtraInfoFailed = () => ({
    type: actionTypes.FETCH_EXTRA_INFO_FAILED,
    
})