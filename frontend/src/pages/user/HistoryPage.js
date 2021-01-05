import React, { useEffect} from 'react'
import SidebarNav from '../../components/nav/SidebarNav'
import { useDispatch, useSelector } from 'react-redux';
import {  CheckCircleOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { allOrder } from '../../redux/order/asyncActionCreator'
import moment from "moment";
import {  PDFDownloadLink,  } from '@react-pdf/renderer';
import Invoice from '../../components/Invoice'; 
import { orderReset } from '../../redux/order/actionCreator';
import Loader from '../../components/Loader';
import { Link} from 'react-router-dom';
const HistoryPage = () => {
    const orderReducer = useSelector(state => state.orderReducer)
    const userReducer = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const { orders, isLoading , } = orderReducer;
    const { currentUser } = userReducer;
    useEffect(() => {
        dispatch(orderReset());
        if(currentUser) {
            dispatch(allOrder(currentUser.authtoken));
        }
    },[currentUser, dispatch])
    
    const showOrderTable = (order) => (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead className="table-light">
                    <tr>
                        <th scope="col" >Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Color</th>
                        <th scope="col">Count</th>
                        <th scope="col">Shipping</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.products.map((p,i) => (
                            <tr key={i}>
                                <td className="font-weight-bold">{p.product.title}</td>
                                
                                <td>{p.product.price}</td>
                                
                                <td>{p.product.brand}</td>
                                
                                <td>{p.product.color}</td>
                                
                                <td>{p.count}</td>
                                <td>{p.product.shipping === "Yes" ? <CheckCircleOutlined style={{color: 'green'}} /> : <CloseCircleOutlined  style={{color: 'red'}}/>}</td>
                            </tr>
                        ))   
                    }
                </tbody>
            </table>
        </div>
    )
    const paymentInfo = (order) => (
        order.paymentMode === 'Stripe' ? <div>
        <div className="row">
            <p className="col-md-4">Oder Id: {order._id}</p>
            <div className="col-md-4">
                <label >Order Status:  </label>
                <p className="bg-primary p-2 text-light">{order.orderStatus}</p>
            </div>
            <p className="col-md-4">Order at: {moment(order.updatedAt).format('MMM Do YYYY, h:mm a')} </p>
        </div>
        <div className="row">
            <p className="col-md-4">Payment Id: {order.paymentIntent.id}</p>
            <p className="col-md-2">Amount: Rs. {order.paymentIntent.amount}</p>
            <p className="col-md-2">Payment mode:  {order.paymentMode}</p>
            <p className="col-md-4">Status: {order.paymentIntent.status === "succeeded" ? <span>Paid <CheckCircleOutlined style={{color: 'green'}}  /> </span> :
             <span> Unpaid <CloseCircleOutlined style={{color: 'red'}} /> </span>}</p>
        </div>
    </div> : <div>
                <div className="row">
                    <p className="col-md-4">Oder Id: {order._id}</p>
                        <div className="col-md-4">
                            <label >Order Status:  </label>
                            <p className="bg-primary p-2 text-light">{order.orderStatus}</p>
                        </div>
                        <p className="col-md-4">Order at: {moment(order.updatedAt).format('MMM Do YYYY, h:mm a')} </p>
                </div>
                
        <div className="row">
            <p className="col-md-2">Payment mode:  {order.paymentMode}</p>
            <p className="col-md-4">Payment Status: { order.isPaid === 'Paid' ? <span> Paid <CheckCircleOutlined style={{color: 'green'}} /> </span> : <span> Unpaid <CloseCircleOutlined style={{color: 'red'}} /> </span>}</p>
        </div>
    </div>
    )
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <SidebarNav />
                </div>
                <div className="offset-md-1 col-md-7  text-secondary  mx-2 my-3">
                    <div className="row">
                        <h4 className="col text-center text-uppercase display-4"> your purchase order</h4>
                    </div>
                    <hr />
                    <br />
                    {
                        isLoading? <Loader width={40} height={40} /> : orders.length > 0 ? 
                        orders.map(( order) => <div key={order._id} className="m-5 p-3 card text-uppercase text-center">
                            <div style={{cursor: 'pointer'}}>{paymentInfo(order)}</div>
                            <div style={{cursor: 'pointer'}}>{showOrderTable(order)}</div>
                            <div style={{cursor: 'pointer'}}>
                                <PDFDownloadLink document={<Invoice order={order} />} fileName="invoice.pdf" className="btn btn-sm btn-block btn-outline-primary">
                                    Pdf download
                                </PDFDownloadLink>
                            </div>
                        </div>) : <div className="row text-uppercase ">You have not purchased anything from us
                            <Link to={'/shop'}>Continue shopping</Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HistoryPage;
