import React, { useEffect } from 'react';
import { Link, useHistory  } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setVisible } from '../../redux/drawer/actionType'
import { getUserCart } from '../../redux/cart/asyncCreator';
import Loader from '../Loader';

const Drawers = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const drawerReducer = useSelector(state => state.drawerReducer)
    const cartReducer = useSelector(state => state.cartReducer)
    const userReducer = useSelector(state => state.userReducer)
    const { products , isLoading, errorMessage  } = cartReducer
    const addToCartReducer = useSelector(state => state.addToCartReducer)
    const { success } = addToCartReducer;
    const { visible } = drawerReducer;
    const { currentUser } = userReducer
    console.log(products)
    
    useEffect(() => {
        if(currentUser) {
            dispatch(getUserCart(currentUser.authtoken))
        }
    },[dispatch, success, ])

    return  isLoading ? <Loader width={0} height={0}  /> :   products.products ? <Drawer 
            className="text-center text-secondary text-uppercase" 
            visible={visible} 
            title={`Cart ${products.products.length}`} 
            placement="right" 
            onClose={() => dispatch(setVisible())}>
            {
                products.products.map((p , i) => <div key={i} >
                        <div className="row">
                            <img className="col"  src={ p.img && p.img} alt={p.slug} style={{ width: '100%', height: 150, objectFit: 'fill'}} />
                        </div>
                        <div className="row">
                            <Link  onClick={() => {history.push(`/product/${p.product.slug}`); dispatch(setVisible())}}
                             className="col text-center mb-3 p-2 text-uppercase mx-3 text-secondary bg-light">
                                {p.product.slug}
                            </Link>
                        </div>
                </div>) 
            }
            <div className="row">
                <Button onClick={() => {dispatch(setVisible());history.push('/cart')}} className="col btn btn-outline-success  m-3 font-weight-bold text-uppercase">Go to cart detail</Button> 
            </div>
</Drawer> : null
}

export default Drawers
