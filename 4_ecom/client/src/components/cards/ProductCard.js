
import React, { useState } from 'react'
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
//defalut image if no image is available
import laptop from '../../images/computer/laptop.png';
import { useNavigate, Link } from 'react-router-dom';
import { showAverage } from '../functions/rating';
import _ from "lodash";

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState('Click to add');

    const handleAddToCart = () => {

        //create cart array: cart info being saved into local storage might contains one or many products
        let cart = []
        if (typeof window !== 'undefined') {
            //.getItem is used to access any key paramater of localStorage!
            if (localStorage.getItem('cart')) {
                //items are stored in localStorage as JSON data so, we need to use JSON.parse()
                //get item and update ot cart variable or array!
                cart = JSON.parse(localStorage.getItem('cart'));
                console.log('hello i am inside localStorage Get item')
            }
            //push new product to cart
            cart.push({
                ...product,
                count: 1,
            });
            //remove Duplicates with npm package loadash. method uniqWith
            //removes duplicate objects from array of objects and keep every objects unique
            let unique = _.uniqWith(cart, _.isEqual)
            //save to localStorage
            // console.log('unique', unique)
            //on saving or setting onto local storage we need to stringify data first
            localStorage.setItem('cart', JSON.stringify(unique))
            //show toolTip
            setTooltip("Added");
        }
    };


    //destructure
    const { images, title, description, slug, price } = product;
    const { Meta } = Card;
    return (
        <div className=' w-[400px]  h-[400px] mb-60' >
            {/* {JSON.stringify(product)} */}
            {/* {JSON.stringify(product.slug)} */}

            {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pb-3 pt-1'> No rating yet</div>}
            < Card
                cover={< img className='w-[250px] h-[350px] object-cover' alt="laptops" src={images && images.length ? images[0].url : laptop
                } />}
                actions={
                    [
                        <Link to={`/product/${slug}`}><EyeOutlined class='text-blue-500 flex justify-center text-xl' />
                            <br /> View Product </Link>,
                        //On click save to local Storage.
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart} href='/#'>
                                <ShoppingCartOutlined class='text-red-500 flex justify-center text-xl' /> <br /> Add to Cart
                            </a>
                        </Tooltip>
                    ]
                }
            >
                <Meta title={`${title} `} description={`${description && description.substring(0, 40)}...`} />
                <div className='mt-1 font-semibold'>
                    ${price}
                </div>
            </Card >
        </div >
    )
}

export default ProductCard
