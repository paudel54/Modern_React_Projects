import AdminNav from '../../../components/nav/AdminNav';
import React, { useEffect, useState } from 'react';
import AdminProductCard from '../../../components/cards/AdminProductCard';

import { getProductsByCount } from '../../../components/functions/category';

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts()
    }, []);


    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(6)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
                // console.log(res.data)
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }

    return (
        //UserNav and AdminNav has consistent layout
        <div className='bg-green-200   grid  grid-cols-12 '>
            <div className='col-span-2'><AdminNav /></div>

            <div className='col-span-10'>
                <div className=''> {loading ? (<h4 className='text-red-600'>Loading....</h4>) : (<h4 className='bold text-2xl mb-5'>All Products........</h4>)}</div>
                {/* <div className='col'>{JSON.stringify(products)}</div> */}
                <div className='flex flex-wrap mr-5'>{products.map((product) => (<AdminProductCard product={product} key={product._id} />))}</div>
            </div>
        </div>
    )
}

export default AllProducts;
