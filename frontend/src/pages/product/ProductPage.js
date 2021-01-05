import React , { useEffect } from 'react';
import { singleProduct } from '../../redux/product/asyncActionCreator';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
const ProductDetail = ({ match }) => {
    const productDetailReducer = useSelector(state => state.productDetailReducer)
    const { product, isProductLoading, errorMessage } = productDetailReducer;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(singleProduct(match.params.slug))
    }, [dispatch, match])
    return isProductLoading ? <Loader /> : errorMessage ? <Message text={errorMessage} /> :
        <div>
            Product Detail Page <h1>{product.title}</h1>
        </div>
}

export default ProductDetail;
