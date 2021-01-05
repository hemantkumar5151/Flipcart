import React, { useState ,  useEffect } from 'react';
import { useDispatch, useSelector,   } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Menu, Badge } from 'antd';
import { HomeOutlined ,ShoppingCartOutlined, SettingOutlined,ShopOutlined ,LogoutOutlined ,UserAddOutlined, UserOutlined } from '@ant-design/icons';

import { auth } from '../../firebase/firebase';
import { userLogout } from '../../redux/user/actionCreator'
import SearchBox from '../SearchBox';

const  { SubMenu, Item } = Menu;


const Header = () => {
    const [current, setCurrent ] = useState('');
    
    const dispatch = useDispatch();
    const history = useHistory();
    const userReducer = useSelector(state => state.userReducer)
    const addToCartReducer = useSelector(state => state.addToCartReducer);
    const { success } = addToCartReducer
    
    const { currentUser } = userReducer

    let cart = []
    if(typeof window!== undefined) {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }
    useEffect(() => {
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    },[success])
    
    const handleClick = e => setCurrent(e.key)
        
    const logoutHandler = () => {
        auth.signOut()
        dispatch(userLogout());

        history.push('/login');
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            
            <Menu.Item key="shop" icon={<ShopOutlined />}>
                <Link to="/shop">Shop</Link>
            </Menu.Item>
            
            <Menu.Item key="cart" icon={<ShoppingCartOutlined  />}>
                <Link to="/cart">
                    <Badge count={cart &&  cart.length} offset={[9,0]}>
                        Cart
                    </Badge>
                </Link>
            </Menu.Item>
            
            {
                currentUser ? null : (
                    <Item key="register" icon={<UserAddOutlined />} className="float-right">
                       <Link to="/register"> Register </Link>
                    </Item> )
            }
           
            {
                currentUser ? null : (
                    <Item key="login" icon={<UserOutlined />} className="float-right">
                        <Link to="/login"> Login </Link>
                    </Item>)
            }
            {   
                currentUser ? 
                    <SubMenu key="setting" title={currentUser.name} icon={<SettingOutlined />} className="float-right">
                        <Item key="dashboard">
                            <Link to={currentUser.role === 'admin' ? "/admin/dashboard" : "/user/history"}>
                                Dashboard
                            </Link>
                        </Item>
                        <Item key="logout" icon={<LogoutOutlined />} onClick={logoutHandler}>Logout</Item>
                    </SubMenu>
                    : null    
            }
            <span key="search" className="float-right p-1">
                <SearchBox />
            </span>
        </Menu>
    )
}

export default Header
