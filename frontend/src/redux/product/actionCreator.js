import {  actionType } from './actionType';

export const productRequest = () => ({
    type: actionType.PRODUCT_REQUEST
})

export const productSuccess = (product) => ({
    type: actionType.PRODUCT_SUCCESS,
    payload: product
})

export const productFailed = error => ({
    type: actionType.PRODUCT_FAILED,
    payload: error
})
export const productReset = () => ({
    type: actionType.PRODUCT_RESET,
})


export const newArrivalProductRequest = () => ({
    type: actionType.NEW_ARRIVAL_PRODUCT_REQUEST
})

export const newArrivalProductSuccess = (product) => ({
    type: actionType.NEW_ARRIVAL_PRODUCT_SUCCESS,
    payload: product
})

export const newArrivalProductFailed = error => ({
    type: actionType.NEW_ARRIVAL_PRODUCT_FAILED,
    payload: error
})

export const newArrivalProductReset = () => ({
    type: actionType.PRODUCT_RESET,
})


export const bestProductRequest = () => ({
    type: actionType.BEST_PRODUCT_REQUEST
})

export const bestProductSuccess = (product) => ({
    type: actionType.BEST_PRODUCT_SUCCESS,
    payload: product
})

export const bestProductFailed = error => ({
    type: actionType.BEST_PRODUCT_FAILED,
    payload: error
})
export const productBelongToSpecificRequest = () => ({
    type: actionType.PRODUCT_BELONG_TO_SPECIFIC_CATEGORY_REQUEST
})

export const productBelongToSpecificSuccess = (product) => ({
    type: actionType.PRODUCT_BELONG_TO_SPECIFIC_CATEGORY_SUCCESS,
    payload: product
})

export const productBelongToSpecificFailed = error => ({
    type: actionType.PRODUCT_BELONG_TO_SPECIFIC_CATEGORY_FAILED,
    payload: error
})


export const productBelongToSubSpecificRequest = () => ({
    type: actionType.PRODUCT_BELONG_TO_SPECIFIC_SUB_CATEGORY_REQUEST
})

export const productBelongToSubSpecificSuccess = (product) => ({
    type: actionType.PRODUCT_BELONG_TO_SPECIFIC_SUB_CATEGORY_SUCCESS,
    payload: product
})

export const productBelongToSubSpecificFailed = error => ({
    type: actionType.PRODUCT_BELONG_TO_SPECIFIC_SUB_CATEGORY_FAILED,
    payload: error
})

export const bestProductReset = () => ({
    type: actionType.PRODUCT_RESET,
})

export const productDetailRequest = () => ({
    type: actionType.PRODUCT_DETAIL_REQUEST
})

export const productDetailSuccess = (product) => ({
    type: actionType.PRODUCT_DETAIL_SUCCESS,
    payload: product
})

export const productDetailFailed = error => ({
    type: actionType.PRODUCT_DETAIL_FAILED,
    payload: error
})

export const productCreateRequest = () => ({
    type: actionType.PRODUCT_CREATE_REQUEST
})

export const productCreateSuccess = () => ({
    type: actionType.PRODUCT_CREATE_SUCCESS,
})

export const productCreateFailed = error => ({
    type: actionType.PRODUCT_CREATE_FAILED,
    payload: error
})

export const productUpdateRequest = () => ({
    type: actionType.PRODUCT_UPDATE_REQUEST
})

export const productUpdateSuccess = () => ({
    type: actionType.PRODUCT_UPDATE_SUCCESS,
})

export const productUpdateFailed = error => ({
    type: actionType.PRODUCT_UPDATE_FAILED,
    payload: error
})



export const productDeleteRequest = () => ({
    type: actionType.PRODUCT_DELETE_REQUEST
})

export const productDeleteSuccess = () => ({
    type: actionType.PRODUCT_DETAIL_SUCCESS
})

export const productDeleteFailed = error => ({
    type: actionType.PRODUCT_DELETE_FAILED,
    payload: error
})

