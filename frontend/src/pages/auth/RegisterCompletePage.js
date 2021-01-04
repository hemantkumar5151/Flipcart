import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import { auth } from '../../firebase/firebase';
const RegisterComplete = (props) => {
    const { history } = props;
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    
    let userEmail = localStorage.getItem('emailForRegistration');
    const userReducer = useSelector(state => state.userReducer);
    const {  currentUser, } = userReducer;

    useEffect(() => {
        if(currentUser) {
            history.push('/')
        }
    },[currentUser, history]);
    const submitHandler = async(e) => {

        e.preventDefault();
        if(password.length < 6) {
            alert('Password must be equal or greater than 6.');
            return;
        }
        try {
            if(auth.isSignInWithEmailLink(window.location.href)) {
                if(!userEmail) {
                    userEmail = window.prompt('Please enter your email');
                }
                const result = auth.signInWithEmailLink(userEmail, window.location.href)
                if((await result).user.emailVerified) {
                    const user = auth.currentUser;
                    const userToken = await (await user.getIdTokenResult()).token;
                    await user.updatePassword(password)

                    toast.success(`Welcome ${user.email.split('@')[0]}!`);
                    
                    localStorage.removeItem('emailForRegistration');
                    history.push('/')

                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <FormContainer>
            <h4>Complete Registration</h4>
            <form onSubmit={submitHandler}>
                <input type="email"  className="form-control my-3" placeholder="type your email"  defaultValue={email} />
                <input type="password" className="form-control my-3" placeholder="type your password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit" className="btn btn-raised btn-secondary" disabled={password.length < 6}>Complete Registration</button>
            </form>
        </FormContainer>
    )
}

export default RegisterComplete
