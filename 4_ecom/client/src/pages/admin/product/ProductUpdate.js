import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';

import { createProduct } from "../../../components/functions/product";
import ProductCreateForm from '../../../components/forms/ProductCreateForm';

import FileUpload from '../../../components/forms/FileUpload';
import { Spin } from 'antd';

//fetching data form backend:
//getCategorySubs only executed if dropdown is selected then the id get released so it executes
import { getCategories, getCategorySubs } from "../../../components/functions/category"

const ProductUpdate = () => {
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <div className='main'>
            <div className=' grid grid-cols-12'>
                <div className='col-span-2'>
                    <AdminNav />
                </div>
                < div className='col-span-10'>

                    <h4>Product Update</h4>
                    <hr />

                </div>
            </div>
        </div>
    )
}
export default ProductUpdate;
