import React from 'react';
import Rating from 'react-star-ratings';
const Ratings = ({product}) => {

    let averageRating;
    if(product && product.ratings) {
        const total = product && product.ratings.length;
        const sum = product && product.ratings.reduce((acc, rating) => acc + rating.star ,0);
        averageRating = Math.ceil(sum / total);
    }

    return <div>
        <Rating 
        rating={averageRating}
        starRatedColor="#5cb85c"
        starDimension="15px"
        starHoverColor="#5cb85c"
    /> <span>{' '}( {product.ratings.length} )</span>
    </div>
}

export default Ratings
