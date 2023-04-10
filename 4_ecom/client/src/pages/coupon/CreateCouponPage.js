import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, removeCoupon, createCoupon } from '../../components/functions/coupon';
import AdminNav from '../../components/nav/AdminNav';

import { DeleteOutlined } from '@ant-design/icons';

const CreateCouponPage = () => {
    return (
        <div>
            <div className='grid grid-cols-12'>
                <div className='col-span-4'>
                    <AdminNav />
                </div>
                <div className='col-span-8'>
                    Coupon
                </div>
            </div>
        </div>
    )
}

export default CreateCouponPage
