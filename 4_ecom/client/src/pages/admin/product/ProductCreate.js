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

const initialState = {
    title: 'Macbook Pro',
    description: 'Base model',
    price: "3200",
    category: '',
    categories: [],
    subs: [],
    shipping: 'Yes',
    quantity: '40',
    //images will have array of url form cloudinary ;)
    images: [],
    //predefined array colors and brands will be shown on dropdown whereas color will be used to be get populated.
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenevo", "Asus", "Dell"],
    color: 'White',
    brand: 'Apple',
};

const ProductCreate = () => {
    //updates the list name with values:)
    const [values, setValues] = useState(initialState);
    //sub subOption comes form response getCategorySubs:
    //contains array of subCategory  obj:
    const [subOptions, setSubOptions] = useState([]);
    //show only when category have been clicked. :)
    const [showSub, setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        //get all categories list from backend and save into categories array: spread operater to update the array
        getCategories().then((c) => setValues({ ...values, categories: c.data }));

    //destructure 
    //passing values to destrustruect within component
    // const { title, description, price, category, categories, subs, shipping, quanity, images, colors, brands, color, brand } = values;

    // const handleSubmit = (e) => {
    //     console.log('checking handler to submit!!!!!!!!')
    //     e.prevent.default();
    //     //send into server
    //     createProduct(values, user.token)
    //         .then((res) => {
    //             console.log('RESPONSE FORM handle submit PRODUCTcreate.....!!', res);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             if (err.response.status === 400) toast.error(err.response.data);
    //         })
    // }


    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);

                window.alert(`${res.data.title} is Created!`)
                //page gets reload to blank spaces.
                window.location.reload();

            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                //displaying error from backeend to frontend with toast
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        // e.prevent.default();
        //updates the targeted state from list of obj
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log('testtttttt', e.target.name, e.target.value)
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        // console.log('clickd category id', e.target.value);
        setValues({ ...values, subs: [], category: e.target.value });
        // sending id to fn to send to backend
        // console.log('Sending ID', e.target.value);
        getCategorySubs(e.target.value).then((res) => {
            console.log('SUB Optoions on category Click', res);
            setSubOptions(res.data);
        });
        setShowSub(true);
    }

    return (
        <div className='main'>
            <div className=' grid grid-cols-10 gap-8'>
                <div className='col-span-3'>
                    <AdminNav />
                </div>
                < div className='col-span-7'>

                    {loading ? <Spin /> : <h4 className='text-2xl font-bold'> Product Create </h4>}
                    <hr />
                    {/* {JSON.stringify(values.images)} */}
                    {/* {JSON.stringify(values.categories)} */}
                    {/* {JSON.stringify(values.subs)} */}

                    <div className='p-3  mb-4'>
                        <FileUpload values={values} setValues={setValues} setLoading={setLoading} />
                    </div>

                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange}
                        values={values} setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        showSub={showSub} subOptions={subOptions} />
                </div >
            </div>
        </div>


    )
}

export default ProductCreate;
