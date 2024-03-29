
import React, { useState } from 'react'
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
//defalut image if no image is available
import laptop from '../../images/computer/laptop.png';
import { useNavigate, Link } from 'react-router-dom';
import { showAverage } from '../functions/rating';
import _ from "lodash";
//redux store to select and update 
import { useSelector, useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
    const [tooltip, setTooltip] = useState('Click to add');

    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

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

            //Add to redux state
            dispatch({
                type: "ADD_TO_CART",
                payload: unique,
            });
            //show cart items on sideDrawer
            dispatch(
                {
                    type: "SET_VISIBLE",
                    payload: true,
                }
            );
        }
    };


    //destructure
    const { images, title, description, slug, price } = product;
    const { Meta } = Card;
    return (
        <div className=' w-[400px]  h-[400px] mb-60 hover:shadow-2xl' >
            {/* {JSON.stringify(product)} */}
            {/* {JSON.stringify(product.slug)} */}

            {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pb-3 pt-1'> No rating yet</div>}
            < Card
                cover={< img className='w-[250px] h-[350px] object-cover ' alt="laptops" src={images && images.length ? images[0].url : laptop
                } />}
                actions={
                    [
                        <Link to={`/product/${slug}`}><EyeOutlined class='text-blue-500 flex justify-center text-xl' />
                            <br /> View Product </Link>,
                        //On click save to local Storage.
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart} href='#/' disabled={product.quantity < 1}>
                                <ShoppingCartOutlined class='text-red-500 flex justify-center text-xl' /> <br />
                                {product.quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
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
