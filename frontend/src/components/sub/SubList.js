import React, { useEffect, } from 'react'
import { Link } from 'react-router-dom';
import {  useDispatch, useSelector } from "react-redux";
import Loader from '../Loader';
import Message from '../Message';
import { allSub } from '../../redux/sub/asyncActionCreator';
const SubList = () => {
    const subReducer = useSelector(state => state.subReducer)
    const { sub, isLoading, errorMessage  } =  subReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allSub())
    },[dispatch])
    return (
        <>    
            <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo ">
                Sub Categories
            </h4>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {
                        isLoading ? <Loader /> : errorMessage ? <Message  text={errorMessage} /> : (
                            sub.map((cat,i) => <div className="  m-3" key={i+1}> 
                                <p className="text-uppercase  display-5  btn btn-raised">
                                    <Link to={`/product/sub-category/${cat.slug}`} className="text-secondary" >
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

export default SubList
