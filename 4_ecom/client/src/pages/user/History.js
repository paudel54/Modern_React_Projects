import UserNav from '../../components/nav/UserNav'

import React from 'react'

// create 2 columns left add navigation bar

const History = () => {
    return (
        <div className='bg-green-200 font-bold border p-4 grid  grid-cols-4 '>
            <UserNav />
            <div className="col-span-3 text-center"> I am user History Page</div>
        </div>
    )
}

export default History
