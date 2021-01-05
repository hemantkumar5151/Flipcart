import React, { useEffect, useState  } from 'react';
import AdminSidebarNav from '../../components/nav/AdminSidebar';
import { allOrder, updateOrder } from '../../redux/order/asyncActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { orderReset } from '../../redux/order/actionCreator';
import moment from 'moment';
import { CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import Loader from '../../components/Loader';
const DashboardPage = () => {

    const status = [
        'Not processed',
        'Processing',
        'Dispatched',
        'Cancelled',
        'Delivered'
    ]

    const orderReducer = useSelector(state => state.orderReducer)
    const updateOrderReducer = useSelector(state => state.updateOrderReducer)
    
    const { success, isLoading: updateLoader} = updateOrderReducer
    const userReducer = useSelector(state => state.userReducer)
    
    const { currentUser } = userReducer
    const { isLoading , orders} = orderReducer 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderReset());
        if(currentUser) {
            dispatch(allOrder(currentUser.authtoken))
        }
    },[currentUser,dispatch, success])

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
        <div>
            <div className="row">
                <p className="col-md-4">Oder Id: {order._id}</p>
                <div className="col-md-4">
                    <span className="text-secondary">Order Status:</span>
                    <select value={order.orderStatus} onChange={(e) =>handleChange(order._id, e.target.value)} 
                    className="form-control px-3 bg-primary  text-light text-uppercase" > 
                     {
                         status.map(((st,i) => <option  key={i} className="m-2 bg-dark text-light" value={st} >{st}</option> ))
                    }</select>
                </div>
                <p className="col-md-4">Order at: {moment(order.updatedAt).format('MMM Do YYYY, h:mm a')} </p>
            </div>
            {
                order.paymentMode === 'Stripe' ? 
                <div className="row">
                    <p className="col-md-4">Payment Id: {order.paymentIntent.id}</p>
                    <p className="col-md-4">Amount: Rs. {order.paymentIntent.amount}</p>
    
                    <p className="col-md-4">Status: {order.paymentIntent.status === "succeeded" ? 
                    <span>Paid <CheckCircleOutlined style={{color: 'green'}}  /> </span> :
             <span> Unpaid <CloseCircleOutlined style={{color: 'red'}} /> </span>}</p>
                    
                </div>
                : 
                <div className="row">
                    <p className="col-md-4">Payment Id: Null </p>
                    <p className="col-md-4">Amount: Rs. 0 </p>
                    
                    <div className="col-md-4">
                        <span className="text-secondary">Payment status:</span>
                        <select value={order.isPaid} onChange={(e) => dispatch(updateOrder(currentUser.authtoken, order._id, { isPaid: e.target.value}))} 
                        className="form-control px-3 bg-primary  text-light text-uppercase" > 
                                <option value="Paid" >Paid</option>
                                <option value="Unpaid">Unpaid</option>
                        </select>
                    </div>
                </div>
            }
        </div>
    )
    const handleChange = (id, orderStatus) => {
        dispatch(updateOrder(currentUser.authtoken, id, { orderStatus}))
    }
     return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                        <AdminSidebarNav />
                </div>
                <div className="offset-md-1 col-md-7  text-secondary  mx-2 my-3">
                    <div className="row">
                        <h4 className="col text-center text-uppercase display-4"> You have received below order</h4>
                    </div>
                    <hr />
                    <br />
                    {
                        updateLoader || isLoading ? <Loader width={40} height={40} /> : orders.length > 0 ?
                         orders.map(( order) => <div key={order._id} className="m-5 p-3 card text-uppercase text-center">
                            <div style={{cursor: 'pointer'}}>{paymentInfo(order)}</div>
                            <div style={{cursor: 'pointer'}}>{showOrderTable(order)}</div>
                            <div style={{cursor: 'pointer'}}>
                                
                            </div>
                        </div>) : <p className="text-uppercase  text-center"> You have not received any order yet.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
