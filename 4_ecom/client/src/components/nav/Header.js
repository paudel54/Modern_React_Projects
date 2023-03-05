import React, { useState } from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const Header = () => {
    const [current, setCurrent] = useState([]);
    const onMenuItemClick = (item) => {
        setCurrent(item.key);
        console.log('selected icon', item.key)
    };
    return (<div>
        <Menu selectedKeys={current} onClick={onMenuItemClick} mode="horizontal" items={[
            {
                label: "Home",
                key: "Home",
                icon: <MailOutlined />,

            },
            {
                label: "Register",
                key: "Register",
                icon: <SettingOutlined />,
                children: [
                    {
                        label: 'Men',
                        key: 'Men'
                    },
                    {
                        label: 'Women',
                        key: 'women'
                    }

                ]
            }

        ]}>
        </Menu>
    </div>);
}


export default Header
