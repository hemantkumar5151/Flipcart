import React, { useState, useEffect  } from 'react';
import {  useSelector } from 'react-redux'; 
import { toast } from 'react-toastify';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';

import { auth } from '../../firebase/firebase';
const ForgotPasswordPage = ({ history }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false) 
    const userReducer = useSelector(state => state.userReducer);
    const {  currentUser, } = userReducer;

    useEffect(() => {
        if(currentUser) {
            history.push('/')
        }
    },[currentUser, history]);
    const submitHandler = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                url: process.env.REACT_APP_FORGOT_RESET_PASSWORD,
                handleCodeInApp: true
            }
            await auth.sendPasswordResetEmail(email, config)
            toast.success(`Password reset link sent to ${email}`)
            setLoading(false)
            setEmail('');

        } catch (error) {
            setLoading(false)
            toast.error(error.message);
        }
    }
    return <>
        {
            loading ?  <Loader /> : 
            <FormContainer>
                <h4>Forgot Password</h4>
                <form onSubmit={submitHandler}>
                    <input type="email" id="email" className="form-control"  value={email} onChange={e => setEmail(e.target.value)} required autoFocus placeholder="type your email"/>
                    <button type="submit" disabled={email.length < 6} className="btn btn-dark btn-raised px-3 my-3">Forgot Password</button>
                </form>
            </FormContainer>
        }
    </>
}

export default ForgotPasswordPage
