import React from 'react'
import { Route , } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import UserRedirect from '../UserRedirect';
const UserRoutes = ({ children, ...rest}) => {
    const userReducer = useSelector(state => state.userReducer)
    
    const { currentUser } = userReducer;
    return currentUser && currentUser.authtoken && currentUser.role === 'user' ? 
    <Route {...rest} render={() => children} /> : <UserRedirect /> 
}

export default UserRoutes
