import { actionType } from './actionType';

export const createCouponRequest = () => ({
    type: actionType.CREATE_COUPON_REQUEST
})

export const createCouponSuccess = (data) => ({
    type: actionType.CREATE_COUPON_SUCCESS,
    payload: data
})

export const createCouponFailed = (error) => ({
    type: actionType.CREATE_COUPON_FAILED,
    payload: error
})


export const getCouponRequest = () => ({
    type: actionType.GET_COUPON_REQUEST
})

export const getCouponSuccess = (data) => ({
    type: actionType.GET_COUPON_SUCCESS,
    payload: data
})

export const getCouponFailed = (error) => ({
    type: actionType.GET_COUPON_FAILED,
    payload: error
})


export const deleteCouponRequest = () => ({
    type: actionType.DELETE_COUPON_REQUEST
})

export const deleteCouponSuccess = (data) => ({
    type: actionType.DELETE_COUPON_SUCCESS,
    payload: data
})

export const deleteCouponFailed = (error) => ({
    type: actionType.DELETE_COUPON_FAILED,
    payload: error
})

export const applyCouponRequest = () => ({
    type: actionType.APPLY_COUPON_REQUEST
})

export const applyCouponSuccess = (data) => ({
    type: actionType.APPLY_COUPON_SUCCESS,
    payload: data
})

export const applyCouponFailed = (error) => ({
    type: actionType.APPLY_COUPON_FAILED,
    payload: error
})

