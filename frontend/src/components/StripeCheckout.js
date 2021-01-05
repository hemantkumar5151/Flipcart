import React , {  useState, useEffect }from 'react'
import {    CardElement,useStripe, useElements} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { Payment } from '../redux/payment/payment';
import { Link } from 'react-router-dom'
import { addToCartReset } from '../redux/cart/actionCreator'
import { createOrder } from '../redux/order/asyncActionCreator';
const StripeCheckout = () => {
  const [disabled, setDisabled] = useState(true);
  const [ err, setError] = useState(null)
  const [ processing, setProcessing ] = useState('');
  const [ succeed, setSucceed] = useState('');
  const userReducer = useSelector(state => state.userReducer);
  const paymentReducer = useSelector(state => state.paymentReducer);

  
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  
  const { secret,  isLoading: secretLoading ,} = paymentReducer;
  const { currentUser } = userReducer;
  useEffect(() => {
      if(currentUser) {
            dispatch(Payment(currentUser.authtoken))
      }
  },[currentUser, dispatch])
  const submitHandler = async(e) => {
    e.preventDefault();
    setProcessing(true)

    const payload = await stripe.confirmCardPayment(secret,{
        payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
                name: e.target.name.value
            },
        },
    });

    if(payload.error) {
        setError(`Payment failed, ${payload.error.message}`);
        setProcessing(false);
    } else {
        dispatch(addToCartReset());
        dispatch(createOrder(currentUser.authtoken, { stripeResponse: payload, paymentMode: 'Stripe'}))
        localStorage.removeItem('cart');

        setError(false)
        setProcessing(false);
        setSucceed(true)
    }
  }
  const changeHandler = async(e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '');
  } 
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
    return (
        <>
            {
                succeed && <div className="text-center text-uppercase py-2 my-3  alert-primary">
                    Payment Successful. {' '}
                        <Link to="/user/history">
                            See it in your purchase history
                        </Link>                 
                </div>
            }
             <form className="stripe-form" id="payment-form" onSubmit={submitHandler}>
                <CardElement id="card-element" options={cardStyle} onChange={changeHandler} />
                <button className="stripe-button"
                    disabled={secretLoading || processing|| disabled}
                    id="submit"
                >
                    <span id="button-text">
                    {secretLoading ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "Pay"
                    )}
                    </span>
                </button>
                <br />
                {
                    err && <div className="card-error text-center  text-uppercase" role="alert" >
                        {err}
                    </div>
                } 
            </form>  

            
        </>
    )
}

export default StripeCheckout
