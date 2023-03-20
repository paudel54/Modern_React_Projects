import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';

import { createProduct } from "../../../components/functions/product";

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
    const { title, description, price, category, categories, subs, shipping, quanity, images, colors, brands, color, brand } = values;

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
                if (err.response.status === 400) toast.error(err.response.data);
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
                    <form onSubmit={handleSubmit}>
                        <div className='container'>
                            <label>Title</label>

                            <input
                                type="text"
                                name="title"
                                className='border border-red-300'
                                value={title}
                                onChange={handleChange} />
                        </div>
                        <div className='container mt-5'>
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                className='border border-red-300'
                                value={description}
                                onChange={handleChange} />
                        </div>

                        <div className='container mt-5'>
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className='border border-red-300'
                                value={price}
                                onChange={handleChange} />
                        </div>

                        <div className='container mt-5'>
                            <label>Shipping</label>
                            <select name="shipping" className='' onChange={handleChange}>
                                <option>Please Select</option>
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>

                        <div className='container mt-5'>
                            <label>Quantity</label>
                            <input type="number" name="quantity" className='border border-red-300' value={quanity} onChange={handleChange} />
                        </div>

                        <div className='container mt-5'>
                            <label>Color</label>
                            <select name="color" className='' onChange={handleChange}>
                                <option>Please Select</option>
                                {colors.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* //Brands */}
                        <div className='container mt-5'>
                            <label>Brands</label>
                            <select name="brand" className='' onChange={handleChange}>
                                <option>Please Select</option>
                                {brands.map((b) => (
                                    <option key={b} value={b}>
                                        {b}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button className=' mt-5 border rounded border-green-600 bg-blue-500 hover:shadow-xl text-white px-4 py-1'>
                            Save
                        </button>
                    </form>

                </div >
            </div>
        </div>


    )
}

export default ProductCreate;
