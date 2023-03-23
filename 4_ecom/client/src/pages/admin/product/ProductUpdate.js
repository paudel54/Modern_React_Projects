import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

//controllers send req  with slug to backend to get product:
import { getProduct } from "../../../components/functions/product";

import FileUpload from '../../../components/forms/FileUpload';
import { Spin } from 'antd';

//fetching data form backend:
//getCategorySubs only executed if dropdown is selected then the id get released so it executes
import { getCategories, getCategorySubs } from "../../../components/functions/category";

const initialState = {
    title: '',
    description: '',
    price: "",
    category: '',
    categories: [],
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenevo", "Asus", "Dell"],
    color: '',
    brand: '',
};



const ProductUpdate = () => {
    //state for product Update:
    const [values, setValues] = useState(initialState);
    // redux
    const { user } = useSelector((state) => ({ ...state }));
    //snipping out the params or slug from browser url
    let { slug } = useParams();

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                // console.log('single Product', p)
                //all the data that we get on response will be populated on values state object:(,);
                setValues({ ...values, ...p.data })

            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    return (
        <div className='main'>
            <div className=' grid grid-cols-12'>
                <div className='col-span-2'>
                    <AdminNav />
                </div>
                < div className='col-span-10'>

                    <h4>Product Update</h4>
                    {JSON.stringify(values)}
                    {JSON.stringify(values.quantity)}

                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values} />
                    <hr />

                </div>
            </div>
        </div>
    )
}
export default ProductUpdate;
