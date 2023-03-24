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
    //categories subcategory option
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    //array of subs: containing IDS arrayOfSubs: setArrayOfSubs
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    // redux
    const { user } = useSelector((state) => ({ ...state }));
    //snipping out the params or slug from browser url
    let { slug } = useParams();

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                // console.log('single Product', p)
                //1.load single product
                setValues({ ...values, ...p.data })
                //2. load single product category subs
                getCategorySubs(p.data.category._id)
                    .then(res => {
                        setSubOptions(res.data); //on 1st load show default subs
                    })
                //3.prepare array of subids to show as defalut sub values in antd select
                let arr = []

                p.data.subs.map(s =>
                    arr.push(s._id)
                )
                console.log('array mapped', arr);
                //previous value have been updated with a new one
                setArrayOfSubIds((prev) => arr); //req for antd select to work
                console.log('Array on state', arrayOfSubIds);

            })

    }

    const loadCategories = () => {
        getCategories()
            .then((c) => {
                // console.log('GET CATEGORIES IN UPDATE PRODUCT', c.data)
                setCategories(c.data);
            });
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log('clicked category', e.target.value);
        setValues({ ...values, subs: [], });

        setSelectedCategory(e.target.value);
        getCategorySubs(e.target.value).then((res) => {
            // console.log('SUB Optoions on category Click', res);
            //set state keeps reacord of categories, sub category
            setSubOptions(res.data);
        });

        // console.log('existing category values.category', values.category);
        //if user clicks back to the original category
        //show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        //state to hold subcategory options. When category is changed from default the subcategory feild would be wiped out!
        setArrayOfSubIds([]);
    }

    return (
        <div className='main'>
            <div className=' grid grid-cols-12'>
                <div className='col-span-2'>
                    <AdminNav />
                </div>
                < div className='col-span-10'>

                    <h4>Product Update</h4>
                    {/* {JSON.stringify(values)}
                    {JSON.stringify(values.quantity)} */}
                    {/* {JSON.stringify(arrayOfSubIds)} */}

                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        loadCategories={loadCategories}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                        selectedCategory={selectedCategory}
                    />
                    <hr />

                </div>
            </div>
        </div>
    )
}
export default ProductUpdate;
