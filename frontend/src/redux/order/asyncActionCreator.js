import Axios from 'axios';
import { allOrderRequest, allOrderSuccess, allOrderFailed,
    singleOrderRequest, singleOrderSuccess, singleOrderFailed,
    createOrderRequest, createOrderSuccess, createOrderFailed,
    updateOrderRequest, updateOrderSuccess, updateOrderFailed,
    deleteOrderRequest, deleteOrderSuccess, deleteOrderFailed,} from './actionCreator';

    
export const allOrder = (authtoken) => async (dispatch, getState ) => {
    try {
        dispatch(allOrderRequest());
        const config = {
            headers: {
                authtoken
            }
        }
        const { currentUser } =  getState().userReducer;
        
        if(currentUser.role === 'admin') {
            const { data } = await Axios.get('/api/v1/order/admin', config);
            dispatch(allOrderSuccess(data.data))
        } else {    
            const { data } = await Axios.get('/api/v1/order', config);
            dispatch(allOrderSuccess(data.data))
        }
    } catch (error) {
        dispatch(allOrderFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const singleOrder = ( id, token) => async (dispatch, ) => {
    try {
        dispatch(singleOrderRequest());
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await Axios.get(`/api/v1/order/${id}`,{}, config);
        dispatch(singleOrderSuccess(data.data.data))
    } catch (error) {
        dispatch(singleOrderFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const createOrder = (authtoken, cart) => async (dispatch, ) => {
    try {
        dispatch(createOrderRequest());
        const config = {
            headers: {
                authtoken
            }
        }
        console.log(cart)
        await Axios.post('/api/v1/order', cart , config);
        dispatch(createOrderSuccess())
    } catch (error) {
        dispatch(createOrderFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const updateOrder = ( authtoken, id,  orderStatus) => async (dispatch, ) => {
    try {
        dispatch(updateOrderRequest());
        const config = {
            headers: {
                authtoken
            }
        }
        await Axios.patch(`/api/v1/order/admin/${id}`, orderStatus , config);
        dispatch(updateOrderSuccess())
    } catch (error) {
        dispatch(updateOrderFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

export const deleteOrder = (id, token) => async (dispatch, ) => {
    try {
        dispatch(deleteOrderRequest());
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await Axios.delete(`/api/v1/order/${id}`,{}, config);
        dispatch(deleteOrderSuccess())
    } catch (error) {
        dispatch(deleteOrderFailed(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}