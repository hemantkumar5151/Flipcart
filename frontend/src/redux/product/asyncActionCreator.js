import axios from 'axios';
import { toast } from 'react-toastify';
import { productRequest, productSuccess, productFailed,
    productDetailRequest, productDetailSuccess, productDetailFailed,
    productCreateRequest, productCreateSuccess, productCreateFailed,
    productUpdateRequest, productUpdateSuccess, productUpdateFailed,
    productDeleteRequest, productDeleteSuccess, productDeleteFailed, 
    newArrivalProductRequest, newArrivalProductSuccess, newArrivalProductFailed, 
    bestProductRequest, bestProductSuccess, bestProductFailed, 
    productBelongToSpecificRequest, productBelongToSpecificSuccess, productBelongToSpecificFailed,
     productBelongToSubSpecificRequest, productBelongToSubSpecificSuccess, productBelongToSubSpecificFailed,
    } from './actionCreator';

export const allProduct = () => async dispatch => {
    try {
        dispatch(productRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get('/api/v1/product/', {}, config);
        dispatch(productSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productFailed(err))
    }
}

export const newArrivalProduct = (sort,order, page) => async dispatch => {
    try {
        dispatch(newArrivalProductRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/v1/product/feature', {sort,page,order}, config);
        dispatch(newArrivalProductSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(newArrivalProductFailed(err))
    }
}


export const bestProduct = (sort,order, page) => async dispatch => {
    try {
        dispatch(bestProductRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post('/api/v1/product/feature', {sort,page,order}, config);
        dispatch(bestProductSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(bestProductFailed(err))
    }
}
export const productBelongToSpecificCategory = (slug) => async dispatch => {
    try {
        dispatch(productBelongToSpecificRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/v1/product/category/${slug}`, {}, config);
        dispatch(productBelongToSpecificSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productBelongToSpecificFailed(err))
    }
}

export const productBelongToSpecificSubCategory = (slug) => async dispatch => {
    try {
        dispatch(productBelongToSubSpecificRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/v1/product/sub-category/${slug}`, {}, config);
        dispatch(productBelongToSubSpecificSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productBelongToSubSpecificFailed(err))
    }
}
export const singleProduct = (slug) => async dispatch => {
    try {
        dispatch(productDetailRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const { data } = await axios.get(`/api/v1/product/${slug}`, {}, config);
        dispatch(productDetailSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productDetailFailed(err))
    }
}

export const createProduct = (authtoken, product) => async dispatch => {
    try {
        dispatch(productCreateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.post('/api/v1/product', product, config);
        dispatch(productCreateSuccess());
        toast.success('Product created successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productCreateFailed(err))
        toast.error(err)
    }
}

export const productUpdate = (authtoken, product, slug)  => async dispatch => {
    try {
        dispatch(productUpdateRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.patch(`/api/v1/product/${slug}`, product, config);
        dispatch(productUpdateSuccess());
        toast.success('You have updated product successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productUpdateFailed(err))
        toast.error(err)
    }
}

export const productDelete= (authtoken, slug ,)  => async dispatch => {
    try {
        dispatch(productDeleteRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken
            }
        }

        await axios.delete(`/api/v1/product/${slug}`, config);
        dispatch(productDeleteSuccess());
        toast.success('You have delete product successfully')
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(productDeleteFailed(err))
        toast.error(err)
    }
}