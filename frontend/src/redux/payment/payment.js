import { toast } from "react-toastify"
import axios from 'axios';
export const actionType = {
    PAYMENT_REQUEST: 'PAYMENT_REQUEST',
    PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
    PAYMENT_FAILED: 'PAYMENT_FAILED',

    PAYMENT_RESET: 'PAYMENT_RESET',
}

export const paymentRequest = () => ({
    type: actionType.PAYMENT_REQUEST
})


export const paymentSuccess = (data) => ({
    type: actionType.PAYMENT_SUCCESS,
    payload: data
})


export const paymentFailed = (err) => ({
    type: actionType.PAYMENT_FAILED,
    payload: err
})


export const paymentReducer = (state ={ isLoading: false,secret: '', success: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.PAYMENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null,
                secret: ''
            }
        case actionType.PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                secret: action.payload,
                success: true,
                errorMessage: null
            }
        case actionType.PAYMENT_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                secret: '',
                errorMessage: action.payload
            }
        default:
            return state;
    }
}


export const Payment = (authtoken, detail) => async dispatch => {
    try {
        dispatch(paymentRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const { data } = await axios.post(`/api/v1/payment/create-payment-intent`, {detail }, config)
        dispatch(paymentSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(paymentFailed(err))
        toast.error('Order not placed.Try again');
    }
}