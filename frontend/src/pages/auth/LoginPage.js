import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MailOutlined, GoogleOutlined, } from '@ant-design/icons';
import FormContainer from '../../components/FormContainer';
import { auth, googleAuthProvider  } from '../../firebase/firebase';
import Loader from '../../components/Loader';
import {  createOrUpdateUser, createOrUpdateUserWithGoogle } from '../../redux/user/asyncActionCreator';
const LoginPage = () => {

    const [email, setEmail] = useState('hemantpupri.hk@gmail.com');
    const [password, setPassword] = useState('')
    
    const userReducer = useSelector(state => state.userReducer);
    const userLoginReducer = useSelector(state => state.userLoginReducer);
    const userLoginWithGoogleReducer = useSelector(state => state.userLoginWithGoogleReducer)
    
    const { isLoading, currentUser, errorMessage } = userReducer;

    const { isLoading: loginLoading, success: loginSuccess, errorMessage: loginErrorMessage }  = userLoginReducer;
    
    const { isLoading: loginLoadingWithGoogle, success: loginSuccessWithGoogle, errorMessage: loginWithGoogleErrorMessage }  = userLoginWithGoogleReducer;
    
    const dispatch = useDispatch();
    
    const history = useHistory();
    useEffect(() => {
        if(currentUser || loginSuccess || loginSuccessWithGoogle){
            let intend = history.location.state;
            if(intend) {
                history.push(intend.from);
            } else {

                if(currentUser.role === 'user') {
                    history.push('/user/history')
                } else if(currentUser.role === 'admin') {
                    history.push('/admin/dashboard');
                }
            }
            
        } 
    },[currentUser, history, loginSuccess, loginSuccessWithGoogle])
    const submitHandler = async e => {
        e.preventDefault();
        
            const result = auth.signInWithEmailAndPassword(email, password);
            const authtoken = (await (await result).user.getIdTokenResult()).token;

            dispatch(createOrUpdateUser(authtoken))
    }

    const loginWithGoogle = async(e) => {
        e.preventDefault();
            const result = auth.signInWithPopup(googleAuthProvider);
            const usertoken = (await (await result).user.getIdTokenResult()).token;

            dispatch(createOrUpdateUserWithGoogle(usertoken))
    }
    return <>
            { isLoading  || loginLoading  || loginLoadingWithGoogle ? 
            <Loader  /> : errorMessage || loginErrorMessage  || loginWithGoogleErrorMessage ? 
            <h1> {errorMessage} {loginErrorMessage } {loginWithGoogleErrorMessage}</h1> :
                <FormContainer>
                    <h4>Login</h4>
                    <form onSubmit={submitHandler} >
                        <div className="form-group">
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="type your email"
                                className="form-control"
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="type your password"
                                className="form-control"
                            />
                        </div>
                        <br />
                        <Button type="primary"  icon={<MailOutlined />} onClick={submitHandler} className="mb-3" shape="round"  size="large" block disabled={password.length < 6 || email.length < 6 }>Login with email/password</Button>
                        <Button type="danger" icon={<GoogleOutlined />}  onClick={loginWithGoogle} className="my-2" shape="round" size="large" block>Login with google </Button>

                        <Link to="/forgot/password" className="float-right text-danger">Forgot password?</Link>
                    </form>
                </FormContainer>
        
        }
    </>
}

export default LoginPage
