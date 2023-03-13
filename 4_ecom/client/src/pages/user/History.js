import UserNav from '../../components/nav/UserNav'

import React from 'react'

// create 2 columns left add navigation bar

const History = () => {
    return (
        <div className='bg-red-400 font-bold border p-4'>
            <div className=" text-center"> I am user History Page</div>
            <UserNav />
        </div>
    )
}

export default History
