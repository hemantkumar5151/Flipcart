import React, {useState, useEffect} from 'react';
import {  useHistory } from 'react-router-dom';
import { Card , Tabs, Tooltip} from 'antd';
import { HeartOutlined , ShoppingCartOutlined} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import ProductListItem from './ProductListItem';
import StarRating from 'react-star-ratings';
import RatingModals from '../modals/RatingModals';
import Rating from '../Rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartSuccess } from '../../redux/cart/actionCreator';
import { setVisible } from '../../redux/drawer/actionType';
import DefaultImage from '../../images/laptop.png';
import { addToWishlist } from '../../redux/wishlist/actionCreator';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const {TabPane } = Tabs
const SingleProduct = ({ product, onChange, star}) => {
    const {  title, images, description, _id} = product
    const [ tooltip, setTooltip ] = useState('Click to add');
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const history =  useHistory()
    const { currentUser } = userReducer;


    const handleAddToClick = () => {
   
        let cart = []
        if(typeof window !== 'undefined'){
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({
                ...product,
                count: 1
            })

            let unique = _.uniqWith(cart, _.isEqual);

            
            localStorage.setItem('cart',JSON.stringify(unique))
            dispatch(addToCartSuccess(unique))
            setTooltip('Added')
            dispatch(setVisible());
        }
    }
    const wishListHandler = (e) => {
        e.preventDefault();
        dispatch(addToWishlist(currentUser.authtoken, product._id))

        history.push('/user/wishlist')
    }
    return (
        <>
            <div className="col-md-7">
                {
                    images && images.length ?<Carousel autoPlay infiniteLoop showArrows={true}  >
                    {
                        images ? images.map((i) => <img className="rounded border" key={i.public_id} src={i.url}  alt={title}/>) : <DefaultImage />
                    }
                </Carousel> : <Card cover={<img   src={DefaultImage}  alt="example" />}
                                style={{  width: 200,  objectFit: 'cover'}}
                 ></Card>
                }
                <Tabs type="card">
                    <TabPane tab="Decription" key="1">
                        { description && description }
                    </TabPane>
                    <TabPane tab="More Info" key="2">
                         Call us on XXX-XXXX-XXX for more information.
                    </TabPane>
                    
                </Tabs>
            </div>   
            <div className="col-md-5">
                <h2 className="bg-light text-secondary display-4 p-3  rounded text-uppercase">{title}</h2>
                <div className="text-center mb-2">
                   {
                       product && product.ratings &&  product.ratings.length > 0 ? <Rating product={product} /> :
                        <span className="text-secondary text-uppercase">No review yet</span>
                   }
                </div>
            <Card  
                actions={[
                    <a  onClick={wishListHandler} className="text-secondary text-uppercase">
                         <HeartOutlined className="text-info" /> 
                        <br/> 
                         Add to wishlist   
                    </a>, 
                    <Tooltip title={tooltip}>    
                        <a onClick={handleAddToClick}>
                                <ShoppingCartOutlined   
                                className="text-warning"  /> 
                                <br />
                                Add to cart
                        </a>
                   </Tooltip>,
                     <RatingModals>
                     <StarRating  
                         name={_id}
                         starRatedColor="#5cb85c"
                         starDimension="25px"
                         starHoverColor="#5cb85c"
                         rating={star}
                         changeRating={onChange}
                         isSelectable={true}
                     />
                 </RatingModals>
                ]}>
                 <ProductListItem  product={product} />   
            </Card>
            </div>
        </>
    )
}

export default SingleProduct
