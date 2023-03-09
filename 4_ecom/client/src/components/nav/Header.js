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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState("home");
    let dispatch = useDispatch();
    // useSelector hooks takes fn as arguments
    let { user } = useSelector((state) => ({ ...state }));
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

            {(!user && (<Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
            </Item>))}


            {(!user && (<Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>))}


            {(user && <SubMenu icon={<SettingOutlined />} title={user.email && user.email.split('@')[0]} style={{ marginLeft: 'auto' }} >
                <Item key="setting:1">Option 1</Item>
                <Item key="setting:2">Option 2</Item>
                <Item icon={<UserOutlined />} onClick={logout}>Logout</Item>
            </SubMenu>)}

        </Menu>
    );
};

export default Header;
