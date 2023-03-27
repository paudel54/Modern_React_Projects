import React, { useEffect, useState } from 'react'
import { getProducts, getProductsCount } from '../functions/product';
import ProductCard from '../cards/ProductCard';
import LoadingCard from '../cards/LoadingCard';
import { Pagination } from 'antd';


const NewArrivals = () => {
    //state to hold the response of products from db through backend
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(2);
    const [productsCount, setProductsCount] = useState(0);

    useEffect(() => {
        loadAllProducts();
    }, [page]);

    useEffect(() => {
        getProductsCount().then(res => setProductsCount(res.data.length))
    }, [])

    //pass sort:sortByDate order limit
    const loadAllProducts = () => {
        setLoading(true);
        //sort order limit
        getProducts('createdAt', 'desc', page)
            .then(r => {
                setProducts(r.data);
                setLoading(false);
            });
    };



    return (
        <div>
            {/* <div>ON test</div>
            {productsCount} */}
            {page}
            <div className='container ml-40'>
                {loading ? <LoadingCard count={3} /> : (<div className=' flex justify-between mt-10  items-center flex-wrap '>
                    {products.map((product) => (
                        <div key={product._id} >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>)}
            </div>
            {/* products count is total products numbers from db
            defaultCurrent is a page number that is rendered on screen!
            total is total number of products displayed
            */}
            {/* <Pagination current={page} total={(productsCount / 3) * 10} onChange={(value) => setPage(value)} /> */}
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

export default NewArrivals
