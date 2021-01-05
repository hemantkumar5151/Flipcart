
import { actionType } from "./actionType";
const initialState = {
    cart:  [],
    isLoading: false,
    errorMessage: null
}

// if(typeof window !== 'undefined') {
//     if(localStorage.getItem('cart')) {
//         initialState.cart = JSON.parse(localStorage.getItem('cart'))
//     } else {
//         initialState.cart = []
//     }
// }

export const  addToCartReducer = (state = { isLoading: false, errorMessage: null, success: false}, action) => {
    switch(action.type) {
        case actionType.ADD_TO_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                success: false
            }
        case actionType.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                success: action.payload,
                isLoading: false,
                errorMessage: null
            }
        case actionType.ADD_TO_CART_FAILED:
            return{
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                success: false
            }
        default:
            return state
    }
}

export const cartReducer = (state = { isLoading: true, products: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.GET_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.GET_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.GET_CART_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        
        case actionType.ADD_TO_CART_RESET:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: null
            }
        default:
            return state;
    }
}

export const deleteCartReducer = (state = { isLoading: false, success: false, errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.DELETE_CART_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.DELETE_CART_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload,
                errorMessage: null
            }
        case actionType.DELETE_CART_FAILED:
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