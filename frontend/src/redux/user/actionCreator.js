import { actionType } from './actionType';

export const userRequest = () => ({
    type: actionType.USER_TRACK_REQUEST
})

export const userSuccess = (user) => ({
    type: actionType.USER_TRACK_SUCCESS,
    payload: user
})

export const userFailed = (error) => ({
    type: actionType.USER_TRACK_FAILED,
    payload: error
})

export const userLoginRequest = () => ({
    type: actionType.USER_LOGIN_REQUEST
})

export const userLoginSuccess = () => ({
    type: actionType.USER_LOGIN_SUCCESS,
})

export const userLoginFailed = error => ({
    type: actionType.USER_LOGIN_FAILED,
    payload: error
})

export const userRegisterRequest = () => ({
    type: actionType.USER_REGISTER_REQUEST
})

export const userRegisterSuccess = () => ({
    type: actionType.USER_REGISTER_SUCCESS,
})

export const userRegisterFailed = error => ({
    type: actionType.USER_REGISTER_FAILED,
    payload: error
})

export const userLoginWithGoogleRequest = () => ({
    type: actionType.USER_LOGIN_WITH_GOOGLE_REQUEST
})

export const userLoginWithGoogleSuccess = () => ({
    type: actionType.USER_LOGIN_WITH_GOOGLE_SUCCESS,
})

export const userLoginWithGoogleFailed = error => ({
    type: actionType.USER_LOGIN_WITH_GOOGLE_FAILED,
    payload: error
})

export const userLogout = () => ({
    type: actionType.USER_LOGOUT
})

export const saveAddressRequest = () => ({
    type: actionType.SAVE_ADDRESS_REQUEST
})

export const saveAddressSuccess = (data) => ({
    type: actionType.SAVE_ADDRESS_SUCCESS,
    payload: data
})

export const saveAddressFailed = () => ({
    type: actionType.SAVE_ADDRESS_FAILED
})