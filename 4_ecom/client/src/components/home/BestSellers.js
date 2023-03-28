import React, { useEffect, useState } from 'react'
import { getProducts, getProductsCount } from '../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';

const BestSellers = () => {
    //state to hold the response of products from db through backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    //to make change in navigation.
    const [page, setPage] = useState(1);
    //setProductCount will set the total items numberfrom db to this state
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {
        loadAllProducts();
    }, [page])

    //get total product from databse on Load
    useEffect(() => {
        getProductsCount().then((res) => setProductsCount(res.data.length))
    }, [])

    //pass sort:sortByNumberOfSoldItems order limit
    const loadAllProducts = () => {
        setLoading(true);
        getProducts('sold', 'desc', page)
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
            <Pagination
                className='flex justify-center'
                current={page}
                //total indicates total products list by default 10 would be shown in single page
                total={(productsCount)}
                //page size indicates that total items to be shown on single page
                pageSize={3}
                //on chaange consists of event that carries page number or paginations no
                onChange={(value) => setPage(value)}
            />
        </div>
    )
}

export default BestSellers
