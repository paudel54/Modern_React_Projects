import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const Orders = ({ orders, handleStatusChange }) => {

    const showOrderInTable = (order) => (
        <table className="min-w-full text-center text-sm font-light mt-5 mb-5">
            <thead className="border-b bg-neutral-800 font-medium text-white">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Color</th>
                    <th scope="col">Count</th>
                    <th scope="col">Shipping</th>
                </tr>
            </thead>

            <tbody>
                {order.products.map((p, i) => (
                    <tr key={i} className='border-b-2 border-gray-400'>
                        <td className=' p-2'>
                            <b>{p.product.title}</b>
                        </td>
                        <td>{p.product.price}</td>
                        <td>{p.product.brand}</td>
                        <td>{p.color}</td>
                        <td>{p.count}</td>
                        <td>
                            {p.product.shipping === "Yes" ? (
                                <CheckCircleOutlined style={{ color: "green" }} />
                            ) : (
                                <CloseCircleOutlined style={{ color: "red" }} />
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );


    return (
        <div className='mt-5'>
            {orders.map((order) => (
                <div key={order._id} className="bg-white p-5 border rounded mb-5 w-3/4 mx-auto shadow-xl">
                    <div className="">
                        <ShowPaymentInfo order={order} showStatus={false} />

                        <div className="row">
                            <div className="col-md-4">Delivery Status</div>
                            <div className="col-md-8">
                                <select
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    className="form-control"
                                    defaultValue={order.orderStatus}
                                    name="status"
                                >
                                    <option value="Not Processed">Not Processed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {showOrderInTable(order)}
                </div>
            ))}

        </div>
    )
}

export default Orders
