import React from 'react';
import {Image } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined  } from '@ant-design/icons';
import { useDispatch ,  useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DefaultImage from '../../images/laptop.png';
import { deleteUserCart, addProductToCart } from '../../redux/cart/asyncCreator';
const ProductList = ({ product }) => {
    const colors = ['Black','White','Red','Silver', 'Blue', 'Orange']
    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.userReducer)
    const { currentUser } = userReducer

    const handleQuantity = (e) => {
        let cart = []
        let qty = e.target.value;
        if(qty > product.available) {
            toast.error(`Max quantity is ${product.quantity}`)
        }
        if(typeof window != 'undefined') {
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart')); 
            }

            console.log(qty)
            console.log(cart[0].count)
            cart.map((p,i) => {
                
                if(p._id === product.product._id) {
                    cart[i].count = qty
                }
            })

            localStorage.setItem('cart',JSON.stringify(cart))
            // dispatch(addToCartReset());
            dispatch(addProductToCart(currentUser.authtoken,cart));

        }
    }

    const handleChangeColor = (e) => {
        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart =  JSON.parse(localStorage.getItem('cart'));
            } 

            cart.map((p,i) =>  {
                 if(product.product._id === p._id) {
                      cart[i].color = e.target.value
                }   
            })

            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch(addProductToCart(currentUser.authtoken,cart));        
            
        }
    }

    const handleRemove = () => {
        let cart = [];
        if(typeof window !== 'undefined') {
            if(localStorage.getItem('cart')) {
                cart =  JSON.parse(localStorage.getItem('cart'));
            } 
            if(cart.length > 0) {
                if(cart.length === 1 ){
                    localStorage.setItem('cart', JSON.stringify([]))
                    dispatch(deleteUserCart(currentUser.authtoken)); 
                } else {
                        let a = cart.filter(p => {
                            console.log(product.product._id, p._id)
                        return product.product._id !== p._id
                        })  

                        localStorage.setItem('cart',JSON.stringify(a));
                        dispatch(addProductToCart(currentUser.authtoken,a))  
                    }
            }
        }
    }

    return (
        <tbody className="table-striped">
            <tr>
                <td>
                    <Image width={100} height={80}  src={product.img ? product.img : product.images ? product.images[0].url : <DefaultImage /> } alt={product.title} className="img img-fluid"/>
                </td>
                <td>{product.product.slug || product.title}</td>
                <td style={{paddingTop: '35px'}}>{product.price}</td>
                <td style={{paddingTop: '35px'}}>{product.product.brand || product.brand}</td>
                            
                <td>
                    <input type="Number" className="form-control text-center" value={  product && product.count} onChange={handleQuantity} style={{paddingTop: '13px'}}/>
                </td>
                <td>
                    <select  className="form-control border-none" name="color" onChange={handleChangeColor}  style={{margin: '2px'}}>
                        <option>{product.color}</option>
                        {
                            colors.filter(f => f.color !== product.color).map((col,i) => <option key={i}>{col}</option>)
                        }
                    </select>
                </td>
                <td>{product.product.shipping === 'Yes' ? <CheckCircleOutlined  className="text-success" style={{margin: '30px' }}/> 
                : <CloseCircleOutlined className="text-center text-danger" style={{margin: '30px' }}/>}</td>
                <td><DeleteOutlined className="text-danger"  style={{marginTop: '30px', marginLeft: '25px' }} onClick={handleRemove}/></td>
            </tr>
        </tbody>
    )
}

export default ProductList;
