import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../components/functions/product';
import ProductCard from '../components/cards/ProductCard';
import Jumbotron from '../components/cards/Jumbotron';

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
            {/* {loading ? <h2 className='bg-red-600'>Loading....</h2> : <h2 className='text-2xl font-bold bg-blue-300 text-white p-10'>All Products</h2>} */}
            <div className='text-center bg-blue-300 p-8 text-2xl text-white font-bold'>
                <Jumbotron text={['New Arrivals', 'Trendings', 'Best Sellers']} />
            </div>
            {/* {JSON.stringify(products)} */}
            <div className='container ml-40'>
                <div className=' flex justify-between mt-10  items-center flex-wrap '>
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
