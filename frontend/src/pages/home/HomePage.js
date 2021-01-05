import React from 'react'
import CategoryList from '../../components/category/CategoryList';

import Jumbotron from '../../components/Jumbotron';
import ProductArrival from '../../components/product/ArrivalProduct';
import BestSeller from '../../components/product/BestSeller';
import SubList from '../../components/sub/SubList';
const HomePage = () => {
    return <>
            <div className="jumbotron font-weight bold text-center h1 ">
                <Jumbotron text={['New Arrival', 'Latest Product', 'Best Product']} />
            </div>
            
            <ProductArrival />
            
            <BestSeller /> 

            <CategoryList />

            <SubList />
        </>
}

export default HomePage;
