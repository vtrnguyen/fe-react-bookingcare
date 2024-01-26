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

export {
    handleLoginApi, getAllUsers, 
    createNewUserService, deleteUserService, editUserService
}
