import React, { useState , useEffect} from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined , ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { addProductToCart  } from '../../redux/cart/asyncCreator';
import { useDispatch,  useSelector } from 'react-redux';
import _ from 'lodash';
import { setVisible } from '../../redux/drawer/actionType';

const { Meta } = Card
const ProductCard = ({ product }) => {

    const { title , description, images, slug , price} = product;
    const [ tooltip, setTooltip ] = useState('Click to add');
    const userReducer = useSelector(state => state.userReducer);
    const { currentUser } = userReducer
    
    const dispatch = useDispatch();
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
            if(currentUser) {
                dispatch(addProductToCart(currentUser.authtoken,unique))
            }    
            localStorage.setItem('cart',JSON.stringify(unique))
            setTooltip('Added')
            dispatch(setVisible());
        }
    }
    return (
        <Card  hoverable 
                className="w-100 border image-fluid   p-2"
                actions={[
                   <Link to={`/product/${slug}`}>
                        <EyeOutlined className="text-cyan" /> 
                        <br />
                        View Detail 
                   </Link>, 
                   <Tooltip title={tooltip}>    
                    <a onClick={handleAddToClick}>
                            <ShoppingCartOutlined   
                            className="text-warning"  /> 
                            <br />
                            Add to cart
                    </a>
                   </Tooltip>
                ]}
                cover={<img alt="example"  src={ images && images.length ? images[0].url : ''}  />}
                style={{  width: 200,  objectFit: 'cover'}}>
                    <Meta title={<span><span className="float-left">{title.toUpperCase()}</span> <span className="float-right">Rs. {price}</span></span> }
                        
                    description={`${description.substring(0,75)}...`}
                    />
                    
            </Card>
    )
}

export default ProductCard
