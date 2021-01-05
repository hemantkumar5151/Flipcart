import { actionType } from "./actionType";


export const addToCartRequest = () => ({
    type: actionType.ADD_TO_CART_REQUEST,
})
export const addToCartSuccess = payload => ({
    type: actionType.ADD_TO_CART_SUCCESS,
    payload: payload
})

export const addToCartFailed = payload => ({
    type: actionType.ADD_TO_CART_FAILED,
    payload: payload
})



export const getCartRequest = () => ({
    type: actionType.GET_CART_REQUEST
})

export const getCartSuccess = payload => ({
    type: actionType.GET_CART_SUCCESS,
    payload: payload
})

export const getCartFailed = error => ({
    type: actionType.GET_CART_FAILED,
    payload: error
})

export const addToCartReset = () => ({
    type: actionType.ADD_TO_CART_RESET
})

export const emptyCartRequest = () => ({
    type: actionType.DELETE_CART_REQUEST
})

export const emptyCartSuccess = payload => ({
    type: actionType.DELETE_CART_SUCCESS,
    payload: payload
})

export const emptyCartFailed = error => ({
    type: actionType.DELETE_CART_FAILED,
    payload: error
})




