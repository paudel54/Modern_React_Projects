import React, { useState, useEffect } from 'react';
import { getProduct, productStar } from '../components/functions/product';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/cards/SingleProduct';
import { useSelector } from 'react-redux';
import { showAverage } from '../components/functions/rating';

const Product = () => {
    const { slug } = useParams();
    //product contains response data
    const [product, setProduct] = useState({})
    // //request to endpont to get data on page load

    //controls stars state
    const [star, setStar] = useState(0);

    //redux user
    const { user } = useSelector((state) => ({ ...state }))
    // console.log(user)

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    //need bug fix here> query db to get start and update the setStar state:0
    useEffect(() => {
        if (product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    }, []);

    const loadSingleProduct = () => getProduct(slug).then(res => setProduct(res.data));
    const onStarClick = (newRating, name) => {
        // console.table(newRating, name);
        setStar(newRating);
        //passing into function to send backend a request with body and header info.
        productStar(name, newRating, user.token)
            .then(res => {
                console.log('rating clicked', res.data)
                loadSingleProduct()
            })
    }

    return (
        <div className=''>
            <div>
                <SingleProduct product={product} onStarClick={onStarClick} star={star} />
            </div>
            <div className='p-5'>
                <div className='mt-20'>
                    <hr />
                    <div className='P-10 flex justify-center text-3xl font-bold'>Related Products </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default Product
