import { getCartFailed, getCartRequest, getCartSuccess,
    emptyCartRequest, emptyCartSuccess, emptyCartFailed,
    addToCartFailed, addToCartRequest, addToCartSuccess,

} from "./actionCreator"
import Axios from 'axios';

export const addProductToCart = (authtoken, cart) => async(dispatch) => {
    try {
        dispatch(addToCartRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                 authtoken
            }
        }
        console.log(cart)
        const { data } = await Axios.post('/api/v1/cart',{cart}, config);
        dispatch(addToCartSuccess(data.data));

    } catch (error) {
        dispatch(addToCartFailed(error.response && error.response.data.message  ? error.response.data.message  : error.message))
    }
}
export const getUserCart = (authtoken) => async(dispatch) => {
    try {
        dispatch(getCartRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
                 authtoken
            }
        }
        const { data } = await Axios.get('/api/v1/cart',config)
        dispatch(getCartSuccess(data.data));

    } catch (error) {
        dispatch(getCartFailed(error.response && error.response.data.message  ? error.response.data.message  : error.message))
    }
}
export const deleteUserCart = (authtoken) => async(dispatch) => {
    try {
        dispatch(emptyCartRequest());
        
        const { data } = await Axios.delete('/api/v1/cart/',{
            headers: {
                authtoken
            }
        })

        dispatch(emptyCartSuccess(data.data));

    } catch (error) {
        dispatch(emptyCartFailed(error.response && error.response.data.message  ? error.response.data.message  : error.message))
    }
}