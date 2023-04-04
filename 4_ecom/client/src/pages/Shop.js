//when landing on Shop show default page:

import React, { useState, useEffect } from 'react'
import { getProductsByCount } from '../components/functions/product'
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';


const Shop = () => {
    //state variable to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

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
