import { actionType} from './actionType';

export const createOrderRequest = () => ({
    type: actionType.CREATE_ORDER_REQUEST
})

export const createOrderSuccess = () => ({
    type: actionType.CREATE_ORDER_SUCCESS
})

export const createOrderFailed = error => ({
    type: actionType.CREATE_ORDER_FAILED,
    payload: error
})


export const updateOrderRequest = () => ({
    type: actionType.UPDATE_ORDER_REQUEST
})

export const updateOrderSuccess = () => ({
    type: actionType.UPDATE_ORDER_SUCCESS
})

export const updateOrderFailed = error => ({
    type: actionType.UPDATE_ORDER_FAILED,
    payload: error
})


export const deleteOrderRequest = () => ({
    type: actionType.DELETE_ORDER_REQUEST
})

export const deleteOrderSuccess = () => ({
    type: actionType.DELETE_ORDER_SUCCESS
})

export const deleteOrderFailed = error => ({
    type: actionType.DELETE_ORDER_FAILED,
    payload: error
})



export const allOrderRequest = () => ({
    type: actionType.ALL_ORDER_REQUEST
})

export const allOrderSuccess = (data) => ({
    type: actionType.ALL_ORDER_SUCCESS,
    payload: data
})

export const allOrderFailed = error => ({
    type: actionType.ALL_ORDER_FAILED,
    payload: error
})


export const singleOrderRequest = () => ({
    type: actionType.SINGLE_ORDER_REQUEST
})

export const singleOrderSuccess = (data) => ({
    type: actionType.SINGLE_ORDER_SUCCESS,
    payload: data
})

export const singleOrderFailed = error => ({
    type: actionType.SINGLE_ORDER_FAILED,
    payload: error
})

export const orderReset = () => ({
    type: actionType.ORDER_RESET    
})