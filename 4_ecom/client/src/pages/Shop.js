//when landing on Shop show default page:

import React, { useState, useEffect } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../components/functions/product'
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';


const Shop = () => {
    //state variable to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    let { search } = useSelector((state) => ({ ...state }))
    const { text } = search;

    //1.load products on  page load by default
    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        getProductsByCount(12)
            .then((p) => {
                setProducts(p.data);
                setLoading(false);
            })
    };

    //2.Load Product on user search input, when text changes on redux store make req  to backend to display data onto card. 
    useEffect(() => {
        // console.log('Load Products on user Search input', text)

        //setting up delay to slower request rate
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
        }, 400)
        return () => clearTimeout(delayed)

    }, [text]);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg)
            .then((res) => {
                setProducts(res.data);
            });
    }


    return (
        <div>
            <div className='grid grid-cols-12'>
                <div className='col-span-3'>
                    Search / Filter Menu
                </div>
                <div className='col-span-9'>
                    {loading ? (<h4>Loading....</h4>) : (<h4 className='text-red-500 text-3xl font-bold'>Products</h4>)}
                    {products.length < 1 && <p>No Products Found</p>}

                    <div className='flex flex-wrap gap-8'>
                        {products.map((p) => (<div key={p._id} className='grid-span-4'> <ProductCard product={p} /> </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
