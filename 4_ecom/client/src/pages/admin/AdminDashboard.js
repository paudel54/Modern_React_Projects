import AdminNav from '../../components/nav/AdminNav';
const AdminDashboard = () => {
  return (
    <div className='bg-green-200   grid  grid-cols-12 '>
      <div className='col-span-2'><AdminNav /></div>

      <div className='col-span-10'>
        <div className=''>Admin Dashboard</div>
      </div>
    </div>
  )
}

export default AdminDashboard
