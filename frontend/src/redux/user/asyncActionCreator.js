import axios from 'axios';
import { toast } from 'react-toastify';
import { userLoginRequest, userLoginSuccess, userLoginFailed ,
     userRequest, userSuccess, userFailed, 
     userLoginWithGoogleFailed, userLoginWithGoogleSuccess, userLoginWithGoogleRequest,
    saveAddressFailed, saveAddressRequest, saveAddressSuccess,

    } from './actionCreator';


export const currentUser = authtoken => async dispatch => {
    try {
        dispatch(userRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const { data } = await axios.post('/api/v1/users/current-user', {}, config);
        dispatch(userSuccess({ ...data.data, authtoken}));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(userFailed(err))
    }
}

export const createOrUpdateUser = authtoken => async dispatch => {
    try {
        dispatch(userLoginRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.post('/api/v1/users/create-or-update-user', {}, config);
        dispatch(userLoginSuccess());
        toast.success('You are logged in successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(userLoginFailed(err))
        toast.error(err)
    }
}

export const createOrUpdateUserWithGoogle = authtoken => async dispatch => {
    try {
        dispatch(userLoginWithGoogleRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.post('/api/v1/users/create-or-update-user', {}, config);
        dispatch(userLoginWithGoogleSuccess());
        toast.success('You are logged in successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(userLoginWithGoogleFailed(err))
        toast.error(err)
    }
}

export const saveAddress = (authtoken, address) => async dispatch => {
    try {
        dispatch(saveAddressRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const {data } = await axios.patch('/api/v1/users/address', {address}, config);
        dispatch(saveAddressSuccess(data.data));
        toast.success('Address saved successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(saveAddressFailed(err))
        toast.error(err)
    }
}
