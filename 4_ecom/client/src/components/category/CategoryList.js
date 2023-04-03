import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getCategories } from '../functions/category';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCategories()
            .then(c => {
                setCategories(c.data)
                setLoading(false)
            })
    }, []);

    const showCategories = () => categories.map((c) => <div key={c._id} className='bg-blue-300 p-4 shadow-lg m-3 w-40 text-center'>
        <Link to={`/category/${c.slug}`}>
            {c.name}
        </Link>

    </div>)

    return (
        <div>
            <div className='flex justify-evenly'>
                {loading ? <h1>Loading....</h1> : showCategories()}
            </div>
        </div>
    )
}

export default CategoryList
