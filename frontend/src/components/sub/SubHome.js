import React, { useEffect } from 'react';
import { useDispatch, useSelector  } from "react-redux";
import {  productBelongToSpecificSubCategory } from '../../redux/product/asyncActionCreator';
import Loader from '../Loader';
import Message from '../Message';
import Card from '../product/ProductCard';
const SubHome = ( {match , } ) => {
    const { slug } = match.params;
    const productBelongToSubSpecificReducer = useSelector(state => state.productBelongToSubSpecificReducer)
    const { products, isLoading, errorMessage  } = productBelongToSubSpecificReducer;
    console.log(products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(productBelongToSpecificSubCategory(slug))
    },[dispatch, slug])
    return isLoading ? <Loader /> : errorMessage ? <span className="text-center"><Message text={errorMessage}/></span> : <>
        <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo text-secondary text-uppercase ">
                Total {products.length} products found with {slug.toUpperCase()} sub category
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

export default SubHome
