import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Message from '../Message';
import { bestProduct } from '../../redux/product/asyncActionCreator';
import Card from './ProductCard';
import axios from 'axios';
import { Pagination } from 'antd';
import Ratings from '../Rating';
const BestSeller = () => {
    const bestProductReducer = useSelector(state => state.bestProductReducer)
    const { products, errorMessage: productErrorMessage , isLoading: productLoading  } = bestProductReducer;
    const dispatch = useDispatch();

    const [ count, setCount ] = useState(0)
    const [page ,setPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/product/count').then(res => {
           setCount(res.data.data) 
        }).catch(err => {
            console.log(err)
        })
        
        dispatch(bestProduct('sold','desc',page));
    }, [dispatch, page])
    
    return  productLoading ? <Loader />: productErrorMessage ? <Message text={productErrorMessage} /> : <>
        <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo ">
            Best Seller
        </h4>
        <div className="container">
            <div className="row ">
                {
                    products.map(product => (
                        <div className="col-md-4  my-2"  key={product._id}>
                            <div className="text-center">
                            { product && product.ratings.length > 0 ? <Ratings product={product}  /> : <span className="text-secondary text-uppercase">No review yet</span>}
                            </div>
                            <Card  product={product}/>
                        </div>
                    ))
                }
            </div>  
            <div className="row d-flex  my-3 justify-content-center">
                <Pagination  total={(count / 3 )* 10} current={page} onChange={vale => setPage(vale)} />
            </div>
        </div>
    </>
}

export default BestSeller
