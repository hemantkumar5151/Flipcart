import { actionType } from './actionType';


export const searchText = text => ({
    type: actionType.SEARCH_TEXT,
    payload: text,
})

export const searchProductRequest = () => ({
    type: actionType.SEARCH_PRODUCT_REQUEST
})

export const searchProductSuccess = data => ({
    type: actionType.SEARCH_PRODUCT_SUCCESS,
    payload: data
})

export const searchProductFailed = error => ({
    type: actionType.SEARCH_PRODUCT_FAILED,
    payload: error
})