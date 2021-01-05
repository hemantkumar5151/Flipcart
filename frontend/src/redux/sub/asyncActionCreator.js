import axios from 'axios';
import { toast } from 'react-toastify';
import { subRequest, subSuccess, subFailed,
    subCreateRequest, subCreateSuccess, subCreateFailed,
    subUpdateRequest, subUpdateSuccess, subUpdateFailed,
    subDeleteRequest, subDeleteSuccess, subDeleteFailed,
    } from './actionCreator';

export const allSub = () => async dispatch => {
    try {
        dispatch(subRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get('/api/v1/sub/', {}, config);
        dispatch(subSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(subFailed(err))
    }
}

export const singleSub = (slug) => async dispatch => {
    try {
        dispatch(subRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/v1/sub/${slug}`, {}, config);
        
        dispatch(subSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(subFailed(err))
    }
}

export const getSub = (id) => async dispatch => {
    try {
        dispatch(subRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.get(`/api/v1/category/sub/${id}`, {}, config);
        
        dispatch(subSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(subFailed(err))
    }
}

export const subCreate = (authtoken, sub) => async dispatch => {
    try {
        dispatch(subCreateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.post('/api/v1/sub', sub, config);
        dispatch(subCreateSuccess());
        toast.success('Sub category created successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(subCreateFailed(err))
        toast.error(err)
    }
}

export const subUpdate = (authtoken, sub, slug)  => async dispatch => {
    try {
        dispatch(subUpdateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.patch(`/api/v1/sub/${slug}`, sub, config);
        dispatch(subUpdateSuccess());
        toast.success('You have updated sab category successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(subUpdateFailed(err))
        toast.error(err)
    }
}

export const subDelete= (authtoken, slug ,)  => async dispatch => {
    try {
        dispatch(subDeleteRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.delete(`/api/v1/sub/${slug}`, config);
        dispatch(subDeleteSuccess());
        toast.success('You have delete sub category successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(subDeleteFailed(err))
        toast.error(err)
    }
}