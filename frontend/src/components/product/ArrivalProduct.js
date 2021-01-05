import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import axios from 'axios';
import { Pagination } from 'antd';
import { newArrivalProduct } from '../../redux/product/asyncActionCreator';
import Ratings from '../Rating';
import Card from './ProductCard';
const ProductArrival = () => {
    const newArrivalProductReducer = useSelector(state => state.newArrivalProductReducer)
    const { products, isLoading: productLoading  } = newArrivalProductReducer;
    const dispatch = useDispatch();
    const [ count, setCount ] = useState(0)
    const [page ,setPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/product/count').then(res => {
           setCount(res.data.data) 
        }).catch(err => {
            console.log(err)
        })
        
        dispatch(newArrivalProduct('createdAt','desc',page));

    }, [dispatch, page])
    return  productLoading ? <Loader /> : <>
        <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo ">
            New Arrival
        </h4>
        <div className="container">
            <div className="row ">
                {
                    products.map(product => (
                        <div className="col-md-4  my-2 "  key={product._id}>
                            <div className="text-center">
                            { product && product.ratings.length > 0 ? <Ratings product={product}  /> :  <span className="text-secondary text-uppercase">No review yet</span>}
                            </div>
                            <Card  product={product} />
                        </div>
                    ))
                }
            </div> 
            <div className="row d-flex justify-content-center my-3 ">
                <Pagination current={page} total={(count / 3) * 10}  onChange={value => setPage(value)} /> 
            </div>
        </div>
    </>
}

export default ProductArrival
