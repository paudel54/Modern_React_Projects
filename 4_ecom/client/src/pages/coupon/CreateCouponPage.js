import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, removeCoupon, createCoupon } from '../../components/functions/coupon';
import AdminNav from '../../components/nav/AdminNav';

import { DeleteOutlined } from '@ant-design/icons';

const CreateCouponPage = () => {
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [discount, setDiscount] = useState('');
    const [loading, setLoading] = useState('');

    //redux
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        // form control to send to backend
        e.preventDefault();
        setLoading(true);
        //console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token)
            .then(res => {
                setLoading(false)
                setName('')
                setDiscount('')
                setExpiry('')
                toast.success(`${res.data.name} is Created`)
            }).catch(e => console.log("Create Coupon Error", e))
    }

    return (
        <div>
            <div className='grid grid-cols-10'>
                <div className='col-span-2'>
                    <AdminNav />
                </div>
                <div className='col-span-8'>
                    <div className='text-2xl font-bold'>Coupon</div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label className='block mb-2 text-sm font-medium text-green-700 '>Name</label>
                            <input type='text' onChange={(e) => setName(e.target.value)} value={name} autoFocus required
                                className='bg-green-50 border border-green-500  placeholder-black-700  text-sm rounded-lg block w-1/2 p-2.5 outline-none '></input>
                        </div>
                        <div className='mb-2'>
                            <label className='block mb-2 text-sm font-medium text-green-700 '>Discount % </label>
                            <input type='text' onChange={(e) => setDiscount(e.target.value)} value={discount} required
                                className='bg-green-50 border border-green-500  placeholder-black-700  text-sm rounded-lg block w-1/2 p-2.5 outline-none '></input>
                        </div>
                        <div className='mb-2'>
                            <label className='block mb-2 text-sm font-medium text-green-700 '>Expiry</label>
                            <DatePicker className='bg-green-50 border border-green-500  placeholder-black-700  text-sm rounded-lg block w-1/2 p-2.5 outline-none ' selected={new Date()} value={expiry} required onChange={(date) => setExpiry(date)} />
                        </div>
                        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  mt-2 outline-none'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage
