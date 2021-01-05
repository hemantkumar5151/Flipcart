import { 
    createCouponRequest, createCouponFailed, createCouponSuccess,
    deleteCouponRequest, deleteCouponFailed, deleteCouponSuccess,
    getCouponRequest, getCouponFailed, getCouponSuccess,
    applyCouponRequest, applyCouponSuccess, applyCouponFailed,
} from './actionCreator';

import axios from 'axios';
import { toast } from 'react-toastify';
export const createCoupon = (authtoken,coupon) => async(dispatch) => {
    try {
        dispatch(createCouponRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const { data } = await axios.post('/api/v1/coupon',  coupon , config)
        dispatch(createCouponSuccess(data.data));
        toast.success('Coupon created successfully');
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(createCouponFailed(err));
        toast.error(err)
    }
}

export const allCoupon = (authtoken) => async(dispatch) => {
    try {
        dispatch(getCouponRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const { data } = await axios.get('/api/v1/coupon', config)
        dispatch(getCouponSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(getCouponFailed(err))
        toast.error(err)
    }
}

export const deleteCoupon = (authtoken, id) => async(dispatch) => {
    try {
        dispatch(deleteCouponRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const { data } = await axios.delete(`/api/v1/coupon/${id}`, config)
        dispatch(deleteCouponSuccess(data.data));
        toast.success('Coupon deleted successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(deleteCouponFailed(err))
        toast.error(err)
    }
}

export const applyCoupon = (authtoken,coupon) => async(dispatch) => {
    try {
        dispatch(applyCouponRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        const { data } = await axios.post('/api/v1/coupon/user-apply',  {coupon} , config)
        dispatch(applyCouponSuccess(data.message));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(applyCouponFailed(err));
    }
}
