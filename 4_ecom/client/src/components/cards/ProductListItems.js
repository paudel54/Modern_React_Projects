import React from 'react'
import { Link } from "react-router-dom";
const ProductListItems = ({ product }) => {
    const {
        price,
        category,
        subs,
        shipping,
        color,
        brand,
        quantity,
        sold,
    } = product;

    return (
        <div>
            {/* {JSON.stringify(category)} */}
            {/* {JSON.stringify(category.slug)} */}
            {/* {console.log('testing obj destru', (category))} */}

            <ul className='p-2'>
                <li className='flex justify-between mb-2'>
                    Price <span>${price}</span>
                </li>
                <li className='flex justify-between mb-2'>
                    Category
                    <Link
                        to={`/category/${category?.slug}`}
                        className="text-blue-400"
                    >
                        {category?.name}
                    </Link>
                </li>
                {subs && (<li className='flex justify-between mb-2'>
                    Sub Categories  {subs.map((s) => (
                        <Link
                            key={s._id}
                            to={`/sub/${s.slug}`}
                            className="className= text-blue-400"
                        >
                            {s.name}
                        </Link>
                    ))}

                </li>)}

                <li className='flex justify-between mb-2'>
                    Shipping <span>{shipping}</span>
                </li>
                <li className='flex justify-between mb-2'>
                    Color <span>{color}</span>
                </li>
                <li className='flex justify-between mb-2'>
                    Brand <span>{brand}</span>
                </li>
                <li className='flex justify-between mb-2'>
                    Quantity <span>{quantity}</span>
                </li>
                <li className='flex justify-between mb-2'>
                    Sold <span>{sold}</span>
                </li>
            </ul>
        </div >
    )
}

export default ProductListItems
