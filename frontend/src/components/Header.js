import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu,  } from 'antd';
import { HomeOutlined , SettingOutlined,UserAddOutlined, UserOutlined } from '@ant-design/icons';
const  { SubMenu, Item } = Menu;
const Header = () => {
    const [current, setCurrent ] = useState('');

    const handleClick = e => setCurrent(e.key)
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
               <Link to="/register"> Register </Link>
            </Item>
           
            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login"> Login </Link>
            </Item>
            
            <SubMenu key="setting" title="Setting" icon={<SettingOutlined />}>
                <Item>Option 1</Item>
                <Item>Option 2</Item>
            </SubMenu>
            
        </Menu>
    )
}

export default Header
