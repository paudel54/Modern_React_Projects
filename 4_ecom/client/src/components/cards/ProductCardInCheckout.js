import React from 'react'

const ProductCardInCheckout = ({ p }) => {
    return (
        <tbody>
            <tr className='bg-white border-b'>
                <td className='px-6 py-4'>Image</td>
                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{p.title}</td>
                <td className='px-6 py-4'>${p.price}</td>
                <td className='px-6 py-4'>{p.brand}</td>
                <td className='px-6 py-4'>{p.color}</td>
                <td className='px-6 py-4'>{p.count}</td>
                <td className='px-6 py-4'>Shipping Icon</td>
                <td className='px-6 py-4'>Delete Icon</td>
                <td></td>
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout
