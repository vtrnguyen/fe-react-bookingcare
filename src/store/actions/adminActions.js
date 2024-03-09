import actionTypes from './actionTypes';
import { 
    createNewUserService, getAllCodeService, 
    getAllUsers, deleteUserService,
    editUserService
} from '../../services/userService';
import { toast } from 'react-toastify';

// will call 2 function below: fetchGenderSuccess, fetchGenderFailed
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch(e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart error: ", e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});

// will call 2 function below: fetchPositionSuccess, fetchPositionFailed
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch(e) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionStart error: ", e);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

// will call 2 function below: fetchRoleSuccess, fetchRoleFailed
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch(e) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleStart error: ", e);
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(saveUserFailed());
            }
        } catch(e) {
            dispatch(saveUserFailed());
            console.log("create user failed: ", e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})

export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("all");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all user is not success!');
                dispatch(fetchAllUserFailed());
            }
        } catch(e) {
            toast.error('Fetch all user is not success!');
            dispatch(fetchAllUserFailed());
            console.log("fetchAllUser error: ", e);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete a user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete a user failed!");
                dispatch(deleteUserFailed());
            }
        } catch(e) {
            toast.error("Delete a user failed!");
            dispatch(deleteUserFailed());
            console.log('Delete a user failed: ', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
})

export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update a user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update a user failed!");
                dispatch(editUserFailed());
            }
        } catch(e) {
            toast.error("Update a user failed!");
            dispatch(editUserFailed());
            console.log('editUserFailed failed: ', e);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
})
