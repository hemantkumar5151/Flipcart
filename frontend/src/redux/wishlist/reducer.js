import { actionType } from "./actionType";

export const wishlistReducer = (state = { wishlist: [], isLoading: false, errorMessage: null }, action) => {
    switch(action.type) {
        case actionType.WISHLIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                wishlist: [],
                errorMessage:  null
            }
        case actionType.WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                wishlist: action.payload,
                errorMessage:  null
            }
        case actionType.WISHLIST_FAILED:
            return {
                ...state,
                isLoading: false,
                wishlist: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export const addToWishlistReducer = (state = { isLoading: false, success: false, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.ADD_TO_WISHLIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.ADD_TO_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload,
                errorMessage: null
            }
        case actionType.ADD_TO_WISHLIST_FAILED:
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

export const removeToWishlistReducer = (state = { isLoading: false, success: false, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.REMOVE_TO_WISHLIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.REMOVE_TO_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: action.payload,
                errorMessage: null
            }
        case actionType.REMOVE_TO_WISHLIST_FAILED:
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
