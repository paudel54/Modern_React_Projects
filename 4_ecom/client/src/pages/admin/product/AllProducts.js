import AdminNav from '../../../components/nav/AdminNav';
import React, { useEffect, useState } from 'react';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { toast } from 'react-toastify';

import { getProductsByCount, removeProduct } from '../../../components/functions/product';

import { useSelector } from 'react-redux';


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    //redux
    const { user } = useSelector((state) => ({ ...state }));


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

    const handleRemove = (slug) => {
        //browser notification to show confirm message
        let answer = window.confirm('Delete?');
        if (answer) {
            // console.log('Send delete Request', slug)
            removeProduct(slug, user.token)
                .then(res => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted`);
                })
                .catch(e => {
                    console.log(e);
                    if (e.respose.status === 4000) toast.error(e.respose.data);
                })
        }
    }

    return (
        //UserNav and AdminNav has consistent layout
        <div className='bg-blue-100  grid  grid-cols-10 '>
            <div className='col-span-3'><AdminNav /></div>

            <div className='col-span-7 mx-auto'>
                <div className=''> {loading ? (<h4 className='text-red-600'>Loading....</h4>) : (<h4 className='bold text-2xl mb-5'>All Products........</h4>)}</div>
                {/* <div className='col'>{JSON.stringify(products)}</div> */}
                <div className='flex flex-wrap mr-5'>{products.map((product) => (<AdminProductCard product={product} key={product._id} handleRemove={handleRemove} />))}</div>
            </div>
        </div>
    )
}

export default AllProducts;
