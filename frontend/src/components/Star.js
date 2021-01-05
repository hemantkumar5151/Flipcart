import React from 'react';
import StarRating from 'react-star-ratings';

const Star = ({ starClick, numberOfStar}) => {
    return (
        <StarRating
        changeRating={( )=> starClick(numberOfStar)}
        starRatedColor="#5cb85c"
        starDimension="20px"
        starHoverColor="#5cb85c"
        numberOfStars={numberOfStar}
        starSpacing="2px"
        starEmptyColor="#5cb85c"
        />
    )
}

export default Star;
