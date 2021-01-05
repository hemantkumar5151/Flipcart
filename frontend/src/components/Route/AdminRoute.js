import React from 'react'
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import UserRedirect from '../UserRedirect';
const AdminRoute = ({ children, ...rest }) => {
    const userReducer = useSelector(state => state.userReducer);

    const { currentUser } = userReducer;
    return currentUser && currentUser.role === 'admin' ? <Route  {...rest} render={() => children } /> : <UserRedirect />
}

export default AdminRoute
