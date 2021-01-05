import React, {  useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../../components/StripeCheckout'
import { createOrder } from '../../redux/order/asyncActionCreator';
import { useSelector, useDispatch } from 'react-redux';
import {Button, Radio } from 'antd'
import '../../stripe.css';

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    
const PaymentPage = ({ history }) => {
    const userReducer = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [ paymentMode, setPaymentMode ] = useState('COD');
    const { currentUser } = userReducer;
    
    console.log(paymentMode)

    const CODOrderHandler = () => {
        dispatch(createOrder(currentUser.authtoken, { stripeResponse: {}, paymentMode}, ));
        localStorage.removeItem('cart');
        setTimeout(() => {
            history.push('/user/history')
        }, 500);
    }
    return (
        <div className="container-fluid">        
            <div className="row">
                <h4 className="col text-center text-uppercase display-4">Complete your purchase</h4>
            </div>
            
            <div className="row">
                <h4 className="col text-center text-uppercase display-5">choose your payment mode</h4>
            </div>
            
            <div className="d-flex justify-content-center my-3 mb-6">
                <Radio.Group value={paymentMode} className="text-uppercase">
                    <Radio  type="radio" value="COD" onChange={e => setPaymentMode(e.target.value)} checked name="paymentMethod">
                        COD
                    </Radio>
                    <Radio type="radio" value="Stripe" onChange={e => setPaymentMode(e.target.value)} name="paymentMethod">
                        Stripe (Online Payment) 
                    </Radio>
                
                </Radio.Group>
            </div>
            {
                paymentMode === 'COD' ? <div className="d-flex justify-content-center">
                    <Button className="btn btn-outline-success" style={{width: 220}} onClick={CODOrderHandler}>Complete Order</Button> 
                </div>:
                <>
                    <div className="row d-flex justify-content-center">
                        <p className="bg-light p-2 text-uppercase">Use this cad number for placing the order : 4000 0015 6000 0002 , exp-date: 01/12, CVC: 123</p>
                    </div>
                    <Elements stripe={promise} >
                        <div className="col-md-8 offset-md-2">
                            <StripeCheckout  />
                        </div>
                    </Elements>
                </>
            }
        </div>
    )
}

export default PaymentPage
