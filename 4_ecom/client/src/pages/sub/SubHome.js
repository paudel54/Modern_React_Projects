import React, { useState, useEffect } from 'react'
import { getSub } from '../../components/functions/sub'
import ProductCard from '../../components/cards/ProductCard'
import { useParams } from 'react-router-dom';

const SubHome = () => {
    let { slug } = useParams();
    const [sub, setSub] = useState({})
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        getSub(slug)
            .then(res => {
                // console.log(JSON.stringify(res.data, null, 4))
                setSub(res.data.sub)
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
                        <h4 className='text-center bg-gray-300 p-3 mb-5'>Loading...</h4> :
                        <h4 className='text-center bg-gray-300 p-3 mb-5 text-3xl'>
                            {products.length} Products in {sub.name} Sub-category
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

export default SubHome
