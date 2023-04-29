import React, { useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // react carousel
import { Carousel } from 'react-responsive-carousel';
import { Card, Tabs, Tooltip } from 'antd';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Laptop from '../../images/computer/laptop.png'
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { useNavigate } from "react-router-dom";

import { showAverage } from '../functions/rating';
import _ from "lodash";
//redux store to select and update 
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist } from '../functions/user';

import { toast } from 'react-toastify';


const { TabPane } = Tabs;
//this is single component of product page:
const SingleProduct = ({ product, onStarClick, star }) => {
    const navigate = useNavigate();
    const [tooltip, setTooltip] = useState('Click to add');
    //redux
    const { user, cart } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const { title, images, description, _id } = product;
    // const { Meta } = Card

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
            //show items in Side Drawer
            dispatch(
                {
                    type: "SET_VISIBLE",
                    payload: true,
                }
            );
        }
    };


    const handleAddToWishlist = (e) => {
        console.log('this is user from redux', user);
        e.preventDefault();
        console.log('userClicked');
        addToWishlist(product._id, user?.token).then((res) => {
            console.log("ADDED TO WISHLIST", res.data);
            toast.success("Added to wishlist");
            console.log('wishlist added Successfully');
            navigate("/user/wishlist");
            console.log('executed Navigation Link');
        }
        );
    };


    return (
        <div className='grid grid-cols-12 '>
            <div className='col-span-7'>
                {/* 7/12=58% image carousel */}
                {images && images.length ? <Carousel showArrows={true} autoPlay infiniteLoop>
                    {images && images.map((i, id) => <img alt='carousel' src={i.url} key={id} />)}
                </Carousel> :
                    <Card>
                        {< img className=' object-contain mb-3' alt="laptops" src={Laptop} />}
                    </Card>

                }

                <Tabs type='card'>
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Make a Call +977 XXXX XXX XXX
                    </TabPane>

                </Tabs>

            </div>
            <div className='col-span-5'>
                <h1 className='text-2xl font-bold p-3 bg-blue-400 text-center'>{title} </h1>
                {/* star rating npm */}

                {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : <div className='text-center pb-3 pt-1'> No rating yet</div>}
                <div>

                </div>
                <div className='text-2xl font-bold'>
                    <Card actions={[
                        // <>
                        //     <ShoppingCartOutlined className='text-green-500' /><br />
                        //     Add to Cart
                        // </>,
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart} href='#/'>
                                <ShoppingCartOutlined class='text-red-500 flex justify-center text-xl' /> <br /> Add to Cart
                            </a>
                        </Tooltip>,
                        <>
                            <a onClick={handleAddToWishlist} href='/'>
                                <HeartOutlined className='text-blue-400' /> <br /> Add to Wishlist
                            </a>
                        </>,

                        <RatingModal>
                            <StarRatings
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>
                    ]}>
                        {/* <Meta title={title} description={description} /> */}
                        {/* <p>price/category/subs/shipping/color/brnad/quantity/available/sold</p> */}
                        <ProductListItems product={product} />
                    </Card>
                </div>
                {/* 5/12=41%
                10/12 Product info */}
            </div>
        </div>
    )
}

export default SingleProduct
