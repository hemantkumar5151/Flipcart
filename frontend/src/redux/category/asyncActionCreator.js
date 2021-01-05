import axios from 'axios';
import { toast } from 'react-toastify';
import { categoryRequest, categorySuccess, categoryFailed , 
    categoryCreateFailed, categoryCreateSuccess, categoryCreateRequest,
    categoryUpdateRequest, categoryUpdateSuccess, categoryUpdateFailed,
    categoryDeleteFailed, categoryDeleteRequest, categoryDeleteSuccess, categoryDetailRequest, categoryDetailSuccess, categoryDetailFailed
    } from './actionCreator';

export const allCategory = () => async dispatch => {
    try {
        dispatch(categoryRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get('/api/v1/category/', {}, config);
        
        dispatch(categorySuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(categoryFailed(err))
    }
}

export const singleCategory = (slug) => async dispatch => {
    try {
        dispatch(categoryDetailRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.get(`/api/v1/category/${slug}`, {}, config);
        dispatch(categoryDetailSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(categoryDetailFailed(err))
    }
}

export const createCategory = (authtoken, category) => async dispatch => {
    try {
        dispatch(categoryCreateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.post('/api/v1/category', category, config);
        dispatch(categoryCreateSuccess());
        toast.success('Category created successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(categoryCreateFailed(err))
        toast.error(err)
    }
}

export const categoryUpdate = (authtoken, category, slug)  => async dispatch => {
    try {
        dispatch(categoryUpdateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.patch(`/api/v1/category/${slug}`, category, config);
        dispatch(categoryUpdateSuccess());
        toast.success('You have updated category successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(categoryUpdateFailed(err))
        toast.error(err)
    }
}

export const categoryDelete= (authtoken, slug ,)  => async dispatch => {
    try {
        dispatch(categoryDeleteRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.delete(`/api/v1/category/${slug}`, config);
        dispatch(categoryDeleteSuccess());
        toast.success('You have delete category successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(categoryDeleteFailed(err))
        toast.error(err)
    }
}