import UserNav from '../../components/nav/UserNav'

import React from 'react'

const Wishlist = () => {
    return (
        <div className='bg-green-200 font-bold border p-4 grid  grid-cols-4 '>
            <UserNav />
            <div className="col-span-3 text-center"> I am user WishList</div>
        </div>
    )
}

export default Wishlist

