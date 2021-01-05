import {  actionType } from './actionType';

export const categoryRequest = () => ({
    type: actionType.CATEGORY_REQUEST
})

export const categorySuccess = (category) => ({
    type: actionType.CATEGORY_SUCCESS,
    payload: category
})

export const categoryFailed = error => ({
    type: actionType.CATEGORY_FAILED,
    payload: error
})

export const categoryReset = () => ({
    type: actionType.CATEGORY_RESET 
})
export const categoryDetailRequest = () => ({
    type: actionType.CATEGORY_DETAIL_REQUEST
})

export const categoryDetailSuccess = (category) => ({
    type: actionType.CATEGORY_DETAIL_SUCCESS,
    payload: category
})

export const categoryDetailFailed = error => ({
    type: actionType.CATEGORY_DETAIL_FAILED ,
    payload: error
})

export const categoryCreateRequest = () => ({
    type: actionType.CATEGORY_CREATE_REQUEST
})

export const categoryCreateSuccess = () => ({
    type: actionType.CATEGORY_CREATE_SUCCESS,
})

export const categoryCreateFailed = error => ({
    type: actionType.CATEGORY_CREATE_FAILED,
    payload: error
})

export const categoryUpdateRequest = () => ({
    type: actionType.CATEGORY_UPDATE_REQUEST
})

export const categoryUpdateSuccess = () => ({
    type: actionType.CATEGORY_UPDATE_SUCCESS,
})

export const categoryUpdateFailed = error => ({
    type: actionType.CATEGORY_UPDATE_FAILED,
    payload: error
})



export const categoryDeleteRequest = () => ({
    type: actionType.CATEGORY_DELETE_REQUEST
})

export const categoryDeleteSuccess = () => ({
    type: actionType.CATEGORY_DELETE_SUCCESS
})

export const categoryDeleteFailed = error => ({
    type: actionType.CATEGORY_DELETE_FAILED,
    payload: error
})

