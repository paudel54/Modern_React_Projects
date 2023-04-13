import UserNav from '../../components/nav/UserNav';
import React, { useState, useEffect } from 'react';
import { getuserOrders } from '../../components/functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

// create 2 columns left add navigation bar

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => getuserOrders(user.token).then(res => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
    })

    const showOrderInTable = (order) => {
        return <div>
            <p>Each order and it's Products</p>
        </div>
    }

    const showEachOrders = () => orders.map((order, i) => (
        <div key={i} className='m-5 w-[20rem] p-6 bg-white border border-gray-200 rounded-lg shadow-xl hover:bg-gray-100'>
            <p>Show Payment Info</p>
            {/* function */}
            {showOrderInTable(order)}
            <div>
                <div>
                    <p>PDF download</p>
                </div>
            </div>
        </div>
    ));

    return (
        <div className='bg-green-200 font-bold border p-4 grid  grid-cols-4 '>
            <UserNav />
            <div className="col-span-3 text-center">
                <div className='text-xl font-bold'>{orders.length > 0 ? 'User Purchased Orders' : ' No purchased Order'}</div>
                <div className='flex flex-col items-center justify-center '>
                    {showEachOrders()}
                </div>

            </div>
        </div>
    )
}

export default History
