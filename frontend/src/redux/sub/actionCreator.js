import {  actionType } from './actionType';

export const subRequest = () => ({
    type: actionType.SUB_REQUEST
})

export const subSuccess = (category) => ({
    type: actionType.SUB_SUCCESS,
    payload: category
})

export const subFailed = error => ({
    type: actionType.SUB_FAILED,
    payload: error
})


export const subCreateRequest = () => ({
    type: actionType.SUB_CREATE_REQUEST
})

export const subCreateSuccess = () => ({
    type: actionType.SUB_CREATE_SUCCESS,
})

export const subCreateFailed = error => ({
    type: actionType.SUB_CREATE_FAILED,
    payload: error
})

export const subUpdateRequest = () => ({
    type: actionType.SUB_UPDATE_REQUEST
})

export const subUpdateSuccess = () => ({
    type: actionType.SUB_UPDATE_SUCCESS,
})

export const subUpdateFailed = error => ({
    type: actionType.SUB_UPDATE_FAILED,
    payload: error
})



export const subDeleteRequest = () => ({
    type: actionType.SUB_DELETE_REQUEST
})

export const subDeleteSuccess = () => ({
    type: actionType.SUB_DELETE_SUCCESS
})

export const subDeleteFailed = error => ({
    type: actionType.SUB_DELETE_FAILED,
    payload: error
})

