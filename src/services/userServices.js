import axios from "../axios";


 const handleLoginApi = (email, password) =>{
    return axios.post('/api/login', {email, password});
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUser = (data) => {
    return axios.post(`/api/create-new-users`, data);
}

const deleteUser = (userId) => {
    return axios.delete(`/api/delete-users`, 
    {
        data: {
            id: userId
        }   
    });
}

const editUser = (inputData) => {
    return axios.put(`/api/edit-users`,inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`);
}


const getTopDoctorHomeService = () => {
    return axios.get(`/api/top-doctor-home`);
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctor`);
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data);
}

const getDetailDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bilk-create-schedule`, data);
}

const getScheduleDoctor = (doctorId, date) => {
    return axios.get(`/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`);
}

const getProfileDoctor = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBooking = (data) => {
    return axios.post(`/api/patient-booking-app`, data);
}

const postVerifyBookApp = (data) => {
    return axios.post(`/api/verify-book-app`, data);
}

const postSendRemedy= (data) => {
    return axios.post(`/api/send-remedy`, data);
}

const getAllPatientBooking = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}


const getExtraInfoById = (doctorId) => {
    return axios.get(`/api/get-extra-info-by-id?doctorId=${doctorId}`);
}


const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty-home`);
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewMedicalFacilities = (data) => {
    return axios.post(`/api/create-new-medical-facilities`, data);
}

const getAllMedicalFacilities = (data) => {
    return axios.get(`/api/get-medical-facilities`);
}

const getMedicalFacilitiesById = (data) => {
    return axios.get(`/api/get-medical-facilities-by-id?id=${data.id}`);
}

const saveInfoMedicalFacilities = (data) => {
    return axios.post(`/api/save-info-medical-facilities`, data);
}
const saveInfoSpecialty = (data) => {
    return axios.post(`/api/save-info-specialty`, data);
}


const handleDeleteSpecialty = (data) => {
    return axios.delete(`/api/delete-specialty?id=${data.id}`);
}

const deleteMedicalFacilities = (data) => {
    return axios.delete(`/api/delete-medical-facilities?id=${data.id}`);
}

const createNewQuestion = (data) => {
    return axios.post('/api/create-new-question', data);
}

const getQuestion = (data) => {
    return axios.get(`/api/get-question`);
}

const getQuestionById = (data) => {
    return axios.get(`/api/get-question-by-id?id=${data.id}`)
}

const search = (data) => {
    return axios.post(`/api/search?searchTerm=${data.search}`)
}

const sendQuestion = (data) => {
    return axios.post(`/api/send-question`, data);
}


const getReply = (data) => {
    return axios.get(`/api/get-reply`);
}







export {
    search,
    getQuestionById,
    handleLoginApi,
    getQuestion,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctor,
    getDetailDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctor,
    getProfileDoctor,
    postPatientBooking,
    postVerifyBookApp,
    getAllPatientBooking,
    postSendRemedy,
    getExtraInfoById,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewMedicalFacilities,
    getAllMedicalFacilities,
    getMedicalFacilitiesById,
    saveInfoMedicalFacilities,
    saveInfoSpecialty,
    handleDeleteSpecialty,
    deleteMedicalFacilities,
    createNewQuestion,
    sendQuestion,
    getReply
};