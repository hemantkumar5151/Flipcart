import React from 'react'
import Ratings from '../Rating';
import Card from './ProductCard';
const RelatedProduct = ({ product }) => {

    return  <>
        <h4 className="display-4 mt-5 mb-2 text-center  jumbotron jumbo ">
                        Related Products
        </h4>
        <div className="container">
            <div className="row ">
                {
                    product.length > 0 ? product.map(product => (
                        <div className="col-md-4  my-2 "  key={product._id}>
                            <div className="text-center">
                            { product && product.ratings.length > 0 ? <Ratings product={product}  /> :  <span className="text-secondary text-uppercase">No review yet</span>}
                            </div>
                            <Card  product={product} />
                        </div>
                    ))
                 : <span className="text-danger d-flex justify-content-center  display-4 text-uppercase ">No product found</span>
                }
            </div>
        </div>
    </>
}

export default RelatedProduct
