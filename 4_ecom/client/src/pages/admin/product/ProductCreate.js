import AdminNav from '../../../components/nav/AdminNav';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
//creating element requires token to verify admin can only create so use create
import { useSelector } from 'react-redux';

import { createProduct } from "../../../components/functions/product"


const ProductCreate = () => {

    const initialState = {
        title: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        subs: [],
        shipping: '',
        quantity: '',
        images: [],
        //predefined array colors and brands will be shown on dropdown whereas color will be used to be get populated.
        colors: ["Black", "Brown", "Silver", "White", "Blue"],
        brands: ["Apple", "Samsung", "Microsoft", "Lenevo", "Asus"],
        color: '',
        brand: '',
    };


    const [values, setValues] = useState(initialState);

    //destructure
    const { title, description, price, category, categories, subs, shipping, quanity, images, colors, brands, color, brand } = values;

    // const ram = ['krishna', 'balaram', 'hari', 'Raja'];
    const handleSubmit = (e) => {
        e.prevent.default();
        console.log('hello handleSubmit');
    }

    const handleChange = (e) => {
        // e.prevent.default();
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
                            <select name="Shipping" className='' onChange={handleChange}>
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
                            <select name="color" className='' onChange={handleChange}>
                                <option>Please Select</option>
                                {brands.map((b, id) => (
                                    <option key={id} value={b}>
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
