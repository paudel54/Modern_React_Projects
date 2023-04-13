import AdminNav from '../../components/nav/AdminNav';
import { useState, useEffect } from 'react';
//Hit the endpoint.
import { getOrders, changeStatus } from '../../components/functions/admin';
//Access Redux store.
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []
  )

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  //when selecting from dropdown updates occures and change is reflected::>
  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      //change is reflected
      loadOrders();
    });
  };

  return (
    <div className='bg-green-200   grid  grid-cols-12 '>
      <div className='col-span-2'><AdminNav /></div>

      <div className='col-span-10'>
        {/* <div className=''>Admin Dashboard</div> */}
        {/* {JSON.stringify(orders)} */}
        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      </div>
    </div>
  )
}

export default AdminDashboard
