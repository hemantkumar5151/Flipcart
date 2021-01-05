import {actionType } from './actionType';

export const searchTextReducer = (state = { text: ''}, action) => {
    switch(action.type) {
        case actionType.SEARCH_TEXT:
            return {...state, text: action.payload}
        default:
            return state
    }
}

export const searchProductReducer = (state = { products: [] , isLoading: false, errorMessage: null}, action) => {
    switch (action.type) {
        case actionType.SEARCH_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.SEARCH_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.SEARCH_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
    
        default:
            return state
    }
}