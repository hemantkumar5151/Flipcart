import { actionType } from "./actionType";

const initialState = {
    success: false,
    isLoading: false,
    errorMessage: null
}

export const subReducer = (state = { isLoading: true, sub: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.SUB_REQUEST:
            return {
                ...state,
                isLoading: true,
                sub: [],
                errorMessage: null
            }
        case actionType.SUB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                sub: action.payload,
                errorMessage: null
            }
        case actionType.SUB_FAILED:
            return {
                ...state,
                isLoading: false,
                sub: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const subDetailReducer = (state = { sub: null, isSubLoading: true, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.SUB_DETAIL_REQUEST:
            return {
                ...state, 
                sub: null,
                isProductLoading: true,
                errorMessage: null
            }
        case actionType.SUB_DETAIL_SUCCESS:
            return {
                ...state, 
                sub: action.payload,
                isProductLoading: false,
                errorMessage: null
            }
        case actionType.SUB_DETAIL_FAILED:
            return {
                ...state, 
                sub: null,
                isProductLoading: false,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export const subCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SUB_CREATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.SUB_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.SUB_CREATE_FAILED:
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

export const subUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SUB_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.SUB_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.SUB_UPDATE_FAILED:
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

export const subDeleteReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SUB_DELETE_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.SUB_DELETE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.SUB_DELETE_FAILED:
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