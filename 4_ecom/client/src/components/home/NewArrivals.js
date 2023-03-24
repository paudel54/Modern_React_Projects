import React, { useEffect, useState } from 'react'
import { getProducts } from '../functions/product';
import ProductCard from '../cards/ProductCard';
import Jumbotron from '../cards/Jumbotron';
import LoadingCard from '../cards/LoadingCard';

const NewArrivals = () => {
    //state to hold the response of products from db through backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, [])

    //pass sort:sortByDate order limit
    const loadAllProducts = () => {
        setLoading(true);
        getProducts('createdAt', 'desc', 3)
            .then(r => {
                setProducts(r.data);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className='container ml-40'>
                {loading ? <LoadingCard count={3} /> : (<div className=' flex justify-between mt-10  items-center flex-wrap '>
                    {products.map((product) => (
                        <div key={product._id} >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>)}
            </div>
        </div>
    )
}

export default NewArrivals
