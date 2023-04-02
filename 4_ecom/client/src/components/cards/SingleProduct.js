import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // react carousel
import { Carousel } from 'react-responsive-carousel';
import { Card, Tabs } from 'antd'
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Laptop from '../../images/computer/laptop.png'
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';

import { showAverage } from '../functions/rating';

const { TabPane } = Tabs;
//this is single component of product page:
const SingleProduct = ({ product, onStarClick, star }) => {
    const { title, images, description, _id } = product;
    // const { Meta } = Card
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
                        <>
                            <ShoppingCartOutlined className='text-green-500' /><br />
                            Add to Cart
                        </>,
                        <Link to="/"><HeartOutlined className='text-blue-400' /> <br />
                            Add to Wishlist</Link>,
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