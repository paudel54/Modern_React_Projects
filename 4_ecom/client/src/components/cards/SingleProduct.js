import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const SingleProduct = ({ product }) => {
    const { title, description, image, slug } = product;
    const { Meta } = Card
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-7'>
                7/12=58% image carousel
            </div>
            <div className='col-span-5'>
                <div className='text-2xl font-bold'>
                    <Card actions={[
                        <>
                            <ShoppingCartOutlined className='text-green-500' /><br />
                            Add to Cart
                        </>,
                        <Link to="/"><HeartOutlined className='text-blue-400' /> <br />
                            Add to Wishlist</Link>

                    ]}>
                        <Meta title={title} description={description} />
                        <p>price/category/subs/shipping/color/brnad/quantity/available/sold</p>
                    </Card>
                </div>
                {/* 5/12=41%
                10/12 Product info */}
            </div>
        </div>
    )
}

export default SingleProduct
