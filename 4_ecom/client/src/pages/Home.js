import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../components/functions/product';
import ProductCard from '../components/cards/ProductCard';

const Home = () => {
    //state to hold the response of products from db through backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(3)
            .then(r => {
                setProducts(r.data);
                setLoading(false);
            });
    };

    return (
        <div>
            {/* Home */}
            {loading ? <h2 className='bg-red-600'>Loading....</h2> : <h2 className='text-2xl font-bold bg-blue-300 text-white p-10'>All Products</h2>}
            {/* {JSON.stringify(products)} */}
            <div className='container ml-40'>
                <div className=' flex justify-between mt-10  items-center '>
                    {products.map((product) => (
                        <div key={product._id} >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
