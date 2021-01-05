import { actionType } from'./actionType';
const initialState = {
    success : false,
    errorMessage: null,
    isLoading: false
}

export const userReducer = (state = {isLoading: false,  currentUser: null,  errorMessage: null}, action) => {
    switch(action.type) {
        case actionType.USER_TRACK_REQUEST:
            return {
                    ...state,
                    isLoading: true,
                    currentUser: null,
                    errorMessage: null
                }
        case actionType.USER_TRACK_SUCCESS:
            return {
                    ...state,
                    isLoading: false,
                    currentUser: action.payload,
                    errorMessage: null
                }
        case actionType.USER_TRACK_FAILED:
            return {
                    ...state,
                    errorMessage: action.payload,
                    isLoading: false,
                    currentUser: null,
                }
        case actionType.USER_LOGOUT:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                currentUser: null
            }
        default:
            return state;
    }
}

export const userLoginReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: true,
                errorMessage: null
            }
        case actionType.USER_LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: action.payload
            }
        case actionType.USER_LOGOUT:
            return {
                ...state,
                success: false,
                errorMessage: null,
                isLoading: false,
            }
        default:
            return state;
    }
}

export const userRegisterReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.USER_REGISTER_REQUEST:
            return {
               ...state,
                isLoading: true,
                success: false,
                errorMessage: null
            }
        case actionType.USER_REGISTER_SUCCESS:
        return {
                ...state,
                success: true,
                isLoading: false,
                errorMessage: null
            }
        case actionType.USER_REGISTER_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
                isLoading: false,
                success: false,
            }
        case actionType.USER_LOGOUT:
            return {
                ...state,
                success: false,
                isLoading: false,
                errorMessage: null
            }
        default:
            return state;
    }
}

export const userLoginWithGoogleReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.USER_LOGIN_WITH_GOOGLE_REQUEST:
            return {
                    ...state,    
                    isLoading: true,
                    success: false,
                    errorMessage: null
                }
        case actionType.USER_LOGIN_WITH_GOOGLE_SUCCESS:
            return {
                    ...state,
                    isLoading: false,
                    success: true,
                    errorMessage: null
                }
        case actionType.USER_LOGIN_WITH_GOOGLE_FAILED:
            return {
                    ...state,
                    errorMessage: action.payload,
                    isLoading: false,
                    success: false
                }
        case actionType.USER_LOGOUT:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: null,
            }
        default:
            return state;
    }
}


export const userAddressSaveReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.USER_LOGIN_WITH_GOOGLE_REQUEST:
            return {
                    ...state,    
                    isLoading: true,
                    success: false,
                    errorMessage: null
                }
        case actionType.USER_LOGIN_WITH_GOOGLE_SUCCESS:
            return {
                    ...state,
                    isLoading: false,
                    success: action.payload,
                    errorMessage: null
                }
        case actionType.USER_LOGIN_WITH_GOOGLE_FAILED:
            return {
                    ...state,
                    errorMessage: action.payload,
                    isLoading: false,
                    success: false
                }
        case actionType.USER_LOGOUT:
            return {
                ...state,
                isLoading: false,
                success: false,
                errorMessage: null,
            }
        default:
            return state;
    }
}

