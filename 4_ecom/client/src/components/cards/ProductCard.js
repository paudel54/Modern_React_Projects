
import React from 'react'
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
//defalut image if no image is available
import laptop from '../../images/computer/laptop.png';
import { useNavigate, Link } from 'react-router-dom';



const ProductCard = ({ product }) => {
    //destructure
    const { images, title, description, slug } = product;
    const { Meta } = Card;
    return (
        <div className=' w-[400px]  h-[400px] mb-40' >
            {/* {JSON.stringify(product)} */}
            {/* {JSON.stringify(product.slug)} */}
            < Card
                cover={< img className='w-[250px] h-[350px] object-cover' alt="laptops" src={images && images.length ? images[0].url : laptop
                } />}
                actions={
                    [
                        <Link to={`/product/${slug}`}><EyeOutlined class='text-blue-500 flex justify-center text-xl' />
                            <br /> View Product </Link>,
                        <>
                            <ShoppingCartOutlined class='text-red-500 flex justify-center text-xl' /> <br /> Add to Cart
                        </>
                    ]
                }
            >
                <Meta title={title} description={`${description && description.substring(0, 40)}...`} />

            </Card >
        </div >
    )
}

export default ProductCard
