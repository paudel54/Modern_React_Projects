import React, { useState, useEffect } from 'react';
import { getProduct } from '../components/functions/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/cards/SingleProduct';

const Product = () => {
    const { slug } = useParams();
    //product contains response data
    const [product, setProduct] = useState({})
    // //request to endpont to get data on page load
    useEffect(() => {
        loadSingleProduct();
    }, [slug])

    const loadSingleProduct = () => getProduct(slug).then(res => setProduct(res.data));

    return (
        <div className=''>
            <div>
                <SingleProduct product={product} />
            </div>
            <div className='p-5'>
                <div className='mt-20'>
                    <hr />
                    <div className='P-10 flex justify-center text-3xl font-bold'>Related Products </div>
                    <hr />
                </div>
            </div>
            {/* {slug} */}
            {/* {JSON.stringify(product)} */}
            {/* Hello Namaste */}
        </div>
    )
}

export default Product
