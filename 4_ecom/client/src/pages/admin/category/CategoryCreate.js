import AdminNav from '../../../components/nav/AdminNav';
import React from 'react';

const CategoryCreate = () => {
    return (
        //UserNav and AdminNav has consistent layout
        <div className='bg-purple-200 font-bold border p-4 grid  grid-cols-4 '>
            <AdminNav />
            <div className="col-span-3 text-center"> Category Create Page!</div>
        </div>
    )
}

export default CategoryCreate;
