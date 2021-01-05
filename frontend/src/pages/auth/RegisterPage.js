import React, { useState, useEffect  } from 'react';
import { toast,} from 'react-toastify';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';

import { auth } from '../../firebase/firebase';
const RegisterPage = ({ history }) => {
    const [email, setEmail] = useState('');

    const userReducer = useSelector(state => state.userReducer);
    const {  currentUser, } = userReducer;

    useEffect(() => {
        if(currentUser) {
            history.push('/')
        }
    },[currentUser, history]);

    const submitHandler = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_EMAIL_REGISTRATION_URL_LINK,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`Sign-in is sent to ${email}. Click the link to complete registration`);
        localStorage.setItem('emailForRegistration',email);
        setEmail('');
    }
    return (
        <FormContainer>    
            <h4>Register</h4>
            <form onSubmit={submitHandler}>
                <input type="email" id="email" className="form-control"  value={email} onChange={e => setEmail(e.target.value)} required autoFocus placeholder="type your email"/>
                <button type="submit" disabled={email.length < 6} className="btn btn-dark btn-raised px-3 my-3">Register</button>
            </form>
        </FormContainer>
    )
}

export default RegisterPage;
