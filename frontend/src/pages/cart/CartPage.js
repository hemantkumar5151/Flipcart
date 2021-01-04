import React, { useEffect}   from 'react';
import ProductList from '../../components/product/ProductList';
import {  Link} from 'react-router-dom';
import {  useSelector , useDispatch} from 'react-redux';
import { addProductToCart , getUserCart} from '../../redux/cart/asyncCreator';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
const CartPage = ({ history }) => {
    
    const cartReducer = useSelector(state => state.cartReducer);
    const deleteCartReducer = useSelector(state => state.deleteCartReducer)
    const userReducer = useSelector(state => state.userReducer);
    const { products, isLoading, errorMessage }= cartReducer
    const { currentUser } = userReducer;
    const { success: deleteSuccess } = deleteCartReducer;
    

    const dispatch = useDispatch();
    
    console.log(products)
    useEffect(() => {
        if(currentUser) { 
            dispatch(getUserCart(currentUser.authtoken))
        }
    },[dispatch, deleteSuccess, currentUser])

    const createOrderToDb = () => {
        dispatch(addProductToCart(currentUser.authtoken, products))
        setTimeout(() => {
            history.push('/checkout')
        }, 500);
    }
    return isLoading ? <Loader width={50} height={50} /> :  errorMessage  || products.products.length === 0  ? 
            <div>
                <Message text={errorMessage ? errorMessage: "You have not added product into your cart." } > 
                {"   "}<Link to="/shop" className="text-dark">Click here to continue shopping</Link></Message>
            </div>
            : <div className="container-fluid ">
                    <div className="row  d-flex justify-content-center">
                        <h4 className="text-uppercase display-4 text-secondary">Cart Page</h4>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row d-flex justify-content-center">
                                <h4 className="display-5 text-secondary text-uppercase">Product details</h4>
                            </div>
                            <hr/>
                            <div className="row  d-flex justify-content-center">
                                <p className="display-5 px-2 text-uppercase text-secondary font-weight-bold">
                                        Total product :
                                    <span>{' '}{products.products.length}</span></p>
                            </div>
                            <hr />
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Count</th>
                                        <th scope="col">Color</th>
                                        <th scope="col">Shipping</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                                {
                                    products.products.map((p, i) => <ProductList key={i} product={p} />)
                                }
                                </table>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="row d-flex justify-content-center">
                                <h4 className="display-5 text-secondary text-uppercase">Order Summary</h4>
                            </div>
                            <hr />

                            <div className="row  d-flex justify-content-center">
                                <p className="display-5 px-2 text-uppercase text-secondary font-weight-bold">
                                        Product title * qty = price
                                </p>
                            </div>
                            <hr />
                            {
                                products.products.map((p , i) => <div className="row" key={i}>
                                    <p className="col-4 text-uppercase">{p.product.slug}</p>
                                    <p className="col-1">*</p>
                                    <p className="col-2">{p.count}</p>
                                    <p className="col-1">=</p>
                                    <p className="col-2">{p.price * p.count}</p>
                                </div>)
                            }
                            < hr />
                            <div className="row">
                                <p className="col-8 text-uppercase">Total price</p>
                                <p className="col-4">Rs. {products.cartTotal}</p>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-success" onClick={() => history.push('/checkout')}>Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
}

export default CartPage;


                                

//                 <div className="col-md-4 ">
//                             <h4 className="display-4  text-secondary text-uppercase ">Order Summary</h4>
//                             <h5 className="text-uppercase">Products </h5>
//                             {
//                                 products.products.map((c,i) => {
//                                     return <div key={i}>
//                                             <p className="text-uppercase ">{c.title}  *  {c.count} = {c.price} </p>
//                                         </div>
//                                 })
//                             }
//                             <hr />
//                             <h5 className="text-secondary text-uppercase">Total: <span className="float-right">Rs.{products.totalPrice}</span></h5>
//                             <hr/>
//                             <br />
//                             {
//                                 currentUser ? <div className="text-uppercase float-right btn btn-outline-success p-2 rounded block " 
//                                 onClick={createOrderToDb}> proceed to checkout</div>
//                                     : <Link  className="btn btn-warning-outline rounded p-2" to={{ pathname:"/login", state:{from : "/cart"}}}>
//                                     You have to login for checkout
//                                 </Link>
//                             }
//                         </div>
