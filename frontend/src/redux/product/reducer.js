import { actionType } from "./actionType";

const initialState = {
    success: false,
    isLoading: false,
    errorMessage: null
}

export const productReducer = (state = { isLoading: true, products: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const newArrivalProductReducer = (state = { isLoading: true, products: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.NEW_ARRIVAL_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.NEW_ARRIVAL_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.NEW_ARRIVAL_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const bestProductReducer = (state = { isLoading: true, products: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.BEST_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.BEST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.BEST_PRODUCT_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const productBelongToSpecificReducer = (state = { isLoading: true, products: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.PRODUCT_BELONG_TO_SPECIFIC_CATEGORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.PRODUCT_BELONG_TO_SPECIFIC_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.PRODUCT_BELONG_TO_SPECIFIC_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}
export const productBelongToSubSpecificReducer = (state = { isLoading: true, products: [], errorMessage: null }, action) => {
    switch (action.type) {
        case actionType.PRODUCT_BELONG_TO_SPECIFIC_SUB_CATEGORY_REQUEST:
            return {
                ...state,
                isLoading: true,
                products: [],
                errorMessage: null
            }
        case actionType.PRODUCT_BELONG_TO_SPECIFIC_SUB_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload,
                errorMessage: null
            }
        case actionType.PRODUCT_BELONG_TO_SPECIFIC_SUB_CATEGORY_FAILED:
            return {
                ...state,
                isLoading: false,
                products: [],
                errorMessage: action.payload
            }
        default:
            return state;
    }
}

export const productDetailReducer = (state = { product: {}, isProductLoading: true, errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.PRODUCT_DETAIL_REQUEST:
            return {
                ...state, 
                product: {},
                isProductLoading: true,
                errorMessage: null
            }
        case actionType.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state, 
                product: action.payload,
                isProductLoading: false,
                errorMessage: null
            }
        case actionType.PRODUCT_DETAIL_FAILED:
            return {
                ...state, 
                product: {},
                isProductLoading: false,
                errorMessage: action.payload
            }
        case actionType.PRODUCT_RESET:
            return {
                ...state,
                product: {},
                isProductLoading: false,
                errorMessage: null
            }
        default:
            return state;
    }
}
export const productCreateReducer = (state = initialState, action) => {
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

export const productUpdateReducer = (state = initialState, action) => {
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

export const productDeleteReducer = (state = initialState, action) => {
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