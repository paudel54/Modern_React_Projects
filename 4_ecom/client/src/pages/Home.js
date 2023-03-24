import React, { useEffect, useState } from 'react'
import { getProductsByCount } from '../components/functions/product';

const Home = () => {
    //state to hold the response of products from db through backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        getProductsByCount(1)
            .then(r => {
                setProducts(r.data);
            });
    };

    return (
        <div>
            Home
            {JSON.stringify(products)}
        </div>
    )
}

export default Home
