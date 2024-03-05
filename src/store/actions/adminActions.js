import actionTypes from './actionTypes';
import { createNewUserService, getAllCodeService } from '../../services/userService';

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
            console.log(">>> Check data create user redux: ", res);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
            } else {
                dispatch(saveUserFailed());
            }
        } catch(e) {
            dispatch(saveUserFailed());
            console.log("create save user failed: ", e);
        }
    }
}

export const saveUserSuccess = () => ({
    type: 'CREATE_USER_SUCCESS'
})

export const saveUserFailed = () => ({
    type: 'CREATE_USER_FAILED'
})
