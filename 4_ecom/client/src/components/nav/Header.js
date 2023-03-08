import React, { useState } from "react";
import { Menu } from "antd";
import firebase from 'firebase/compat/app';

import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
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
                <Link to="/">Home</Link>
            </Item>

            <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>

            <SubMenu icon={<SettingOutlined />} title="Username">
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<UserOutlined />} onClick={logout}>Logout</Item>
            </SubMenu>
        </Menu>
    );
};

export default Header;
