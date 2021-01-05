import React, { useEffect} from 'react'
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from "react-redux";
import { allCategory } from '../../redux/category/asyncActionCreator';
import Loader from '../Loader';
import Message from '../Message';
const CategoryList = () => {
    const categoryReducer = useSelector(state => state.categoryReducer)
    const { categories, isLoading, errorMessage  } = categoryReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allCategory())
    },[dispatch])
    return (
        <>    
            <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo ">
                Categories
            </h4>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {
                        isLoading ? <Loader /> : errorMessage ? <Message  text={errorMessage} /> : (
                            categories.map((cat,i) => <div className="  m-3" key={i+1}> 
                                <p className="text-uppercase  display-5  btn btn-raised">
                                    <Link to={`/product/category/${cat.slug}`} className="text-secondary" >
                                        {cat.name}
                                    </Link>
                                </p>
                            </div>)      
                        )
                    }
                </div>  
            </div> 
        </>
   
    )
}

export default CategoryList
