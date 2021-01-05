import { searchProductFailed, searchProductRequest, searchProductSuccess } from './actionCreator';
import axios from 'axios';

export const searchProduct = text => async(dispatch) => {
    try {
        dispatch(searchProductRequest());
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post(`/api/v1/product/search-or-filter/`, {query: text}, config);
        console.log(data)
        dispatch(searchProductSuccess(data.data));
    } catch (error) {
        const err = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch(searchProductFailed(err))
    }
}