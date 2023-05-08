import UserNav from '../../components/nav/UserNav'

import React, { useState, useEffect } from 'react';
import { getWishlist, removeWishlist } from '../../components/functions/user';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
// import { DeleteOutlined } from '@ant-design/icons';
const Wishlist = () => {
    const [wishlist, setWishList] = useState([]);
    const { user } = useSelector((state) => ({ ...state }))

    useEffect(() => {
        loadWishlist()
    }, [])

    const loadWishlist = () =>
        getWishlist(user.token).then((res) => {
            // console.log(res);
            setWishList(res.data.wishlist)
        });

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token).then((res) => {
            //once it has been removed reload the page or UI updates:
            loadWishlist();
        });

    return (
        <div className='grid  grid-cols-10 gap-8 '>
            <div className='col-span-3'>
                <UserNav />
            </div>
            <div className="col-span-7 text-center mt-10">
                <h4 className='font-bold'>WishList</h4>
                {wishlist.map((p) => (
                    <div key={p._id} className="bg-red-300">
                        <Link to={`/product/${p.slug}`}>{p.title}</Link>
                        <span
                            onClick={() => handleRemove(p._id)}
                            className="bg-red-600 float-right cursor-pointer"
                        >
                            Add icon on click delete
                        </span>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Wishlist



