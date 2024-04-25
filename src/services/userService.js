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

export {
    handleLoginApi, getAllUsers, 
    createNewUserService, deleteUserService, editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctorsService, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor
}
