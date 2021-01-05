import  { actionType }from './actionType';
import axios from 'axios';
export const addToWishlist = (authtoken, id ) => async dispatch => {
    try {
        dispatch({
            type: actionType.ADD_TO_WISHLIST_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }
        const { data } = await axios.post('/api/v1/users/wishlist/', {id}, config);
        dispatch({
            type: actionType.ADD_TO_WISHLIST_SUCCESS,
            payload: data.data
        });
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: actionType.ADD_TO_WISHLIST_FAILED,
            payload: err
        })
    }
}

export const Wishlist = (authtoken,  ) => async dispatch => {
    try {
        dispatch({
            type: actionType.WISHLIST_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }
        const { data } = await axios.get('/api/v1/users/wishlist/', config);
        dispatch({
            type: actionType.WISHLIST_SUCCESS,
            payload: data.data
        });
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: actionType.WISHLIST_FAILED,
            payload: err
        })
    }
}

export const removeWishlist = (authtoken,  id ) => async dispatch => {
    try {
        dispatch({
            type: actionType.REMOVE_TO_WISHLIST_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }
        const { data } = await axios.patch(`/api/v1/users/wishlist/${id}`, {} ,config);
        dispatch({
            type: actionType.REMOVE_TO_WISHLIST_SUCCESS,
            payload: data.data
        });
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: actionType.REMOVE_TO_WISHLIST_FAILED,
            payload: err
        })
    }
}