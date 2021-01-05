import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from "react-redux";
import { productBelongToSpecificCategory } from '../../redux/product/asyncActionCreator';
import Loader from '../Loader';
import Message from '../Message';
import Card from '../product/ProductCard';
const CategoryHome = ( {match , } ) => {
    const { slug } = match.params;
    const productBelongToSpecificReducer = useSelector(state => state.productBelongToSpecificReducer)
    const { products, isLoading, errorMessage  } = productBelongToSpecificReducer;

    console.log(products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(productBelongToSpecificCategory(slug))
    },[dispatch])
    return isLoading ? <Loader /> : errorMessage ? <span className="text-center"><Message text={errorMessage}/></span> : <>
        <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo text-secondary text-uppercase ">
                Total {products.length} products found with {slug.toUpperCase()} category
            </h4>
        <div className="container">    
            <div className="row ">
                {
                    products.map(product => (
                        <div className="col-md-4  my-2 "  key={product._id}>
                            <Card  product={product} />
                        </div>
                    ))
                }
            </div>
        </div> 
    </>
}

export default CategoryHome
