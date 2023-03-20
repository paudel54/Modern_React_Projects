import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';

import { createProduct } from "../../../components/functions/product";
import ProductCreateForm from '../../../components/forms/ProductCreateForm';

const initialState = {
    title: 'Macbook Pro',
    description: 'Base model',
    price: "3200",
    category: '',
    categories: [],
    subs: [],
    shipping: 'Yes',
    quantity: '40',
    images: [],
    //predefined array colors and brands will be shown on dropdown whereas color will be used to be get populated.
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenevo", "Asus"],
    color: 'White',
    brand: 'Apple',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

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

    return (
        <div className='main'>
            <div className=' grid grid-cols-12'>
                <div className='col-span-2'>
                    <AdminNav />
                </div>
                < div className='col-span-10'>

                    <h4> Product Create </h4>
                    <hr />
                    {/* {JSON.stringify(values)} */}
                    <ProductCreateForm handleSubmit={handleSubmit} handleChange={handleChange} values={values} />
                </div >
            </div>
        </div>


    )
}

export default ProductCreate;
