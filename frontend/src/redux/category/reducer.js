import { actionType } from "./actionType";

const initialState = {
    success: false,
    isLoading: false,
    errorMessage: null
}

export const categoryReducer = (state = { isLoading: true, categories: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.CATEGORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                categories: [],
                errorMessage: null
            }
        case actionType.CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload,
                errorMessage: null
            }
        case actionType.CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                categories: [],
                errorMessage: action.payload
            }
        case actionType.CATEGORY_RESET:
            console.log('I am at home page')
            return {
                ...state, 
                isLoading: true,
                categories: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const categoryDetailReducer = (state = { category: null, isCategoryLoading: true, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.CATEGORY_DETAIL_REQUEST:
            return {
                ...state, 
                category: null,
                isCategoryLoading: true,
                errorMessage: null
            }
        case actionType.CATEGORY_DETAIL_SUCCESS:
            return {
                ...state, 
                category: action.payload,
                isCategoryLoading: false,
                errorMessage: null
            }
        case actionType.CATEGORY_DETAIL_FAILED:
            return {
                ...state, 
                category: null,
                isCategoryLoading: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export const categoryCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.CATEGORY_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.CATEGORY_CREATE_FAILED:
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

export const categoryUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CATEGORY_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.CATEGORY_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.CATEGORY_UPDATE_FAILED:
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

export const categoryDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CATEGORY_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.CATEGORY_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.CATEGORY_DELETE_FAILED:
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