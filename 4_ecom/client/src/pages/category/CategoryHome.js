import React, { useState, useEffect } from 'react'
import { getCategory } from '../../components/functions/category'
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard'
import { useParams } from 'react-router-dom';

const CategoryHome = () => {
    let { slug } = useParams();
    const [category, setCategory] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        getCategory(slug)
            .then(res => {
                console.log(JSON.stringify(res.data, null, 4))
                setCategory(res.data.category)
                setProducts(res.data.products)
                setLoading(false)
            })
    }, [])

    return (
        <div>
            {/* <div className='text-2xl text-red-400 text-center mt-10'>{slug}</div> */}
            <div>
                <div className='mb-10'>
                    {loading ?
                        <h4 className='text-center bg-gradient-to-r from-indigo-500 text-gray-700 p-3 mb-5'>Loading...</h4> :
                        <h4 className='text-center bg-gradient-to-r from-indigo-500 p-3 mb-5 text-3xl text-gray-700'>
                            {products.length} Products in {category.name} category
                        </h4>}
                </div>
                <div className='flex gap-10 flex-wrap justify-center'>
                    {products.map(
                        (p) => <div key={p.id}>
                            <ProductCard product={p} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CategoryHome
