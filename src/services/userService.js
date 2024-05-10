import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (dataUser) => {
    return axios.post('/api/create-new-user', dataUser);
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        }
    });
}

const editUserService = (userUpdate) => {
    return axios.put('/api/edit-user', userUpdate);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get('/api/get-all-doctors');
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctor', data);
}

const getDetailInforDoctor = (doctorId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-booking-appointment', data);
}

const postVerifyBookingAppointment = (data) => {
    return axios.post('/api/verify-booking-appointment', data);
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
}

const getAllSpecialty = () => {
    return axios.get('/api/get-all-specialty');
}

const getDetailSpecialtyById = (inputData) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${inputData.id}&location=${inputData.location}`);
}

export {
    handleLoginApi, getAllUsers, 
    createNewUserService, deleteUserService, editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate,
    getExtraInforById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookingAppointment,
    createNewSpecialty, getAllSpecialty,
    getDetailSpecialtyById
}
