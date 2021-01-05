import { actionType } from './actionType';

const initialState = {
    isLoading: false,
    success: false,
    errorMessage: null
}

export const orderReducer = (state = { orders: [], isLoading: false, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.ALL_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                orders: [],
                errorMessage: null
            }
        case actionType.ALL_ORDER_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                orders: action.payload,
                errorMessage: null
            }
        case actionType.ALL_ORDER_FAILED:
            return {
                isLoading: false,
                orders: [],
                errorMessage: action.payload,
            }
        case actionType.ORDER_RESET:
            return {
                ...state,
                orders: [],
                isLoading: false,
                errorMessage: null
            }
        default:
            return state;
    }
}

export const orderDetailReducer = (state = { order: {}, isLoading: false, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.SINGLE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                order: {},
                errorMessage: null
            }
        case actionType.SINGLE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.payload,
                errorMessage: null
            }
        case actionType.SINGLE_ORDER_FAILED:
            return {
                isLoading: true,
                order: {},
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const createOrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.CREATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
            
        case actionType.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.CREATE_ORDER_FAILED:
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

export const updateOrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.UPDATE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
            
        case actionType.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.UPDATE_ORDER_FAILED:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const deleteOrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.DELETE_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
            
        case actionType.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.DELETE_ORDER_FAILED:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

