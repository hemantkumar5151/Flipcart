import { Button } from 'antd';
import React, {  useEffect, useState } from 'react'
import {  useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { addToCartReset } from '../../redux/cart/actionCreator'
import { deleteUserCart, getUserCart,  } from '../../redux/cart/asyncCreator';
import { saveAddress } from '../../redux/user/asyncActionCreator';
import ReactQuill from 'react-quill';
import { applyCoupon } from '../../redux/coupon/asyncActionCreator';
import Message from '../../components/Message';
import 'react-quill/dist/quill.snow.css';
const CheckOutPage = ({ history }) => {

    const [ address, setAddress ] = useState('')
    const [ visible , setVisible] = useState(false)
    const [ coupon , setCoupon ] = useState('')
    const userReducer = useSelector(state => state.userReducer)
    const cartReducer = useSelector(state => state.cartReducer);
    const deleteCartReducer = useSelector(state => state.deleteCartReducer)
    const userAddressSaveReducer = useSelector(state => state.userAddressSaveReducer)
    const applyCouponReducer = useSelector(state => state.applyCouponReducer);
    const { isLoading: couponLoading, success: couponAppliedSuccess, errorMessage: couponErr} = applyCouponReducer;
    const {  success: successSaveAddress, isLoading: addressLoading } = userAddressSaveReducer;
    const { products: product, isLoading: loading, } = cartReducer
    console.log(product);
    const { success , isLoading: emptyLoading,} = deleteCartReducer
    const { currentUser } = userReducer
    const dispatch = useDispatch()

    useEffect(() => {
            if(currentUser) {
                dispatch(getUserCart(currentUser.authtoken))
            }
        }, [currentUser, dispatch, visible , ]);

    const saveUserAddress = (e) => {
        e.preventDefault();
        dispatch(saveAddress(currentUser.authtoken, address))
        setVisible(false);
        setAddress('');

    } 
    const deleteHandler = () => {

        if(typeof window !== undefined) {
            localStorage.removeItem('cart');
        }
        dispatch(addToCartReset());

        dispatch(deleteUserCart(currentUser.authtoken));

        if(success) {
            history.push('/shop');
        }
    }
    const applyCouponHandler = () => {
        dispatch(applyCoupon(currentUser.authtoken, coupon.toUpperCase()))
        setCoupon('');
    }

    return (
        <div className="container-fluid">        
            <div className="row">
                <h4 className="col text-center text-uppercase display-4">Checkout page</h4>
            </div>
            {
            loading  ? <Loader /> :  <div className="row">
            <div className="col-md-8">
                <h4 className="text-secondary text-uppercase display-5">Delivery address</h4>
                <hr />
                {
                    currentUser && <div className="text-secondary text-uppercase ">
                            <p>Name: {currentUser.name}</p>
                            <p>Email: {currentUser.email}</p>
                            <p>Address: </p>
                          </div>   
                     
                }
                
                {
                    !currentUser.address &&
                    <>
                        <ReactQuill theme="snow" value={address} onChange={setAddress} />
                        {
                            addressLoading ? <Loader width={40} height={40} /> : 
                            <button className="btn btn-outline-warning text-uppercase my-3 " onClick={saveUserAddress}>save </button>
                        }
               
                    </>
                }
                <hr />
                <p className="display-6 text-uppercase">Products</p>
                <hr />
                {
                    product && product.products   ? <div  className="table-responsive-sm m-0">
                            <table className="table ">
                            <thead className="text-uppercase">
                                <th className="row"> 
                                    <th className="col">Image</th>
                                    <th className="col">title</th>
                                    <th className="col">Quantity</th>
                                    <th className="col"> Price</th>
                                </th>
                            </thead>
                            <tbody>
                                {
                                    product.products.map(p => <tr key={p._id} className="row text-uppercase">
                                        <td className="col">
                                            <img height="100" width="120" src={`${p.img}`} alt={p.title}  />
                                        </td >
                                        <td className="col">{p.product.slug}</td>
                                        <td className="col">{p.count}</td>
                                        <td className="col">{p.price}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    : <h3 className="display-4">No product in your cart</h3>
                }
                <hr />
            </div>
            <div className="col-md-4">    
                <h4 className="display-5 text-uppercase text-secondary">Order Summary</h4>
                <hr />
                <p className="text-uppercase font-weight-bold text-secondary">Product Details</p>
                <hr />
                {
                    product.products && 
                    product.products.map( p => <div className="row border-bottom text-uppercase my-3" key={p._id}>
                        <p className="col-4"> { p.product.slug}  </p>
                        <p className="col-1"> * </p>
                        <p className="col-1"> { p.count } </p>
                        <p className="col-1">=</p>
                        <p className="col-4">Rs. {p.product.price} </p>
                    </div>)
                }

                {
                    product.cartTotal && <div className="row display-5 text-secondary font-weight-bold border-bottom">
                        <p className="col-7 text-uppercase ">Total Price</p>
                        <p className="col-5">Rs. {product.cartTotal} </p>
                    </div>  
                }
                <p className="display-5 my-3 text-uppercase font-weight-bold text-secondary ">Got Coupon???</p>
                <hr />
                {
                    couponLoading ? <Loader   width={25} height={25} /> : <div className="row m-1">
                        
                        <input className="form-control col-6 text-uppercase" 
                        type="text"
                        placeholder="coupon code" 
                        value={coupon} onChange={e => setCoupon(e.target.value)}  
                        required/>
                        <button className="btn btn-outline-success offset-1 col-5 " onClick={applyCouponHandler}>apply</button>
                        {
                            couponAppliedSuccess  ? <div className="w-100 my-2"><Message text={couponAppliedSuccess}  type="alert-success"/></div> 
                            :   couponErr ? 
                              <div className="w-100 my-2">
                                <Message text={  couponErr }  />
                            </div> : null
                        }
                    </div>
                }
                <hr />
                
                {
                    couponAppliedSuccess  ? product.totalAfterDiscount && <div className="row display-5 text-secondary font-weight-bold border-bottom">
                        <p className="col-7 text-uppercase ">You have to pay  after discount</p>
                        <p className="col-5">Rs. {product.totalAfterDiscount } </p>
                    </div>  : <div className="row display-5 text-secondary font-weight-bold border-bottom">
                        <p className="col-7 text-uppercase ">You have to pay </p>
                        <p className="col-5">Rs. {product.cartTotal } </p>
                    </div>
                }
                <div className="row  my-3 mx-1 text-uppercase">
                        { emptyLoading ? <Loader width={40} height={40} /> : <Button className=" col-5 btn btn-outline-danger" onClick={deleteHandler}>Empty cart</Button>}
                        <Button className="offset-1 col-6 btn btn-outline-primary " onClick={() => history.push('/payment')} 
                        disabled={!currentUser.address}>Place order</Button>
                    
                </div>
            </div>
        </div>
        
            }
        </div>
    )
}

export default CheckOutPage;
