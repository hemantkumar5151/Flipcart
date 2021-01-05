import { actionType } from './actionType';

const initialState = {
    isLoading: false,
    success: false,
    errorMessage: null
}

export const getCouponReducer = (state = { coupons: [], isLoading: false, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.GET_COUPON_REQUEST:
            return {
                ...state,
                isLoading: true,
                coupons: [],
                errorMessage: null
            }
        
        case actionType.GET_COUPON_SUCCESS:
            return {
                ...state,
                isLoading: false,
                coupons: action.payload,
                errorMessage: null
            }
        
        case actionType.GET_COUPON_REQUEST:
            return {
                ...state,
                isLoading: false,
                coupons: [],
                errorMessage: action.payload,
            }
        default:
            return state;
    }
}

export const createCouponReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.CREATE_COUPON_REQUEST:
            return{
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        
        case actionType.CREATE_COUPON_SUCCESS:
            return{
                ...state,
                isLoading: false,
                success: action.payload,
                errorMessage: null
            }
        case actionType.CREATE_COUPON_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const deleteCouponReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.DELETE_COUPON_FAILED:
            return{
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        
        case actionType.DELETE_COUPON_SUCCESS:
            return{
                ...state,
                isLoading: false,
                success: action.payload,
                errorMessage: null
            }
        case actionType.DELETE_COUPON_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const applyCouponReducer = (state = { isLoading: false, success: null, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.APPLY_COUPON_REQUEST:
            return{
                ...state,
                isLoading: true,
                success: null,
                errorMessage: null
            }
        
        case actionType.APPLY_COUPON_SUCCESS:
            return{
                ...state,
                isLoading: false,
                success: action.payload,
                errorMessage: null
            }
        case actionType.APPLY_COUPON_FAILED:
            return {
                ...state,
                isLoading: false,
                success: null,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}