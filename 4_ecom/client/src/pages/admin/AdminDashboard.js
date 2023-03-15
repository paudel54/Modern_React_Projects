import AdminNav from '../../components/nav/AdminNav';
import React from 'react';

const AdminDashboard = () => {
  return (
    //UserNav and AdminNav has consistent layout
    <div className='bg-green-200 font-bold border p-4 grid  grid-cols-4 '>
      <AdminNav />
      <div className="col-span-3 text-center"> Admin Dashboard!</div>
    </div>
  )
}

export default AdminDashboard
