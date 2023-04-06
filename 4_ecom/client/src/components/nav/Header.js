import React, { useState } from "react";
import { Menu, Badge } from "antd";
import firebase from 'firebase/compat/app';
import Search from "../forms/Search";

import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,

} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
    // useSelector hooks takes fn as arguments
    //accessing from redux state
    let { user, cart } = useSelector((state) => ({ ...state }));
    console.log(user);
    const navigate = useNavigate();

    const handleClick = (e) => {
        // console.log(e.key);
        // console.log(e);
        setCurrent(e.key);
    };

    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOGOUT",
            payload: null
        });
        navigate('/login');
    }
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<AppstoreOutlined />}>
                <Link to="/">Home </Link>
                {/* {JSON.stringify(state)} */}
                {/* -{JSON.stringify(user)} */}
            </Item>

            <Item key="shop" icon={<ShoppingOutlined />}>
                <Link to="/shop">Shop </Link>
                {/* {JSON.stringify(state)} */}
                {/* -{JSON.stringify(user)} */}
            </Item>

            <Item key="cart" icon={<ShoppingCartOutlined />}>
                <Link to="/cart">
                    <Badge count={cart.length} offset={[9, 0]}>
                        Cart
                    </Badge>
                </Link>
            </Item>


            {(!user && (<Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
            </Item>))}


            {(!user && (<Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>))}


            {(user && <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} style={{ marginLeft: 'auto' }} >


                {user && user.role === 'subscriber' &&
                    <Item key="setting:1">
                        <Link to="/user/history"> Dashboard</Link>
                    </Item>
                }

                {user && user.role === 'admin' &&
                    <Item key="setting:1">
                        <Link to="/admin/dashboard"> Dashboard</Link>
                    </Item>
                }

                {/* <Item key="setting:1">Dashboard</Item> */}
                <Item key="setting:2">Option 2</Item>
                <Item icon={<UserOutlined />} onClick={logout}>Logout</Item>
            </SubMenu>)}
            <span className="p-1"> <Search /> </span>
        </Menu>
    );
};

export default Header;
