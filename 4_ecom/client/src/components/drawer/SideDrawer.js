import React from 'react'
import { Drawer, Button } from 'antd';
//access redux
import { useSelector, useDispatch } from 'react-redux';
import Link from 'react-router-dom';
import laptop from '../../images/computer/laptop.png';

const SideDrawer = ({ children }) => {

    const dispatch = useDispatch();
    const { drawer, cart } = useSelector((state) => ({ ...state }))


    return (
        <Drawer open={true}>
            {JSON.stringify(cart)}
        </Drawer>
    )
}

export default SideDrawer
