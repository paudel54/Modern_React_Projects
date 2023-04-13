import UserNav from '../../components/nav/UserNav';
import React, { useState, useEffect } from 'react';
import { getuserOrders } from '../../components/functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFDownloadLink,
    PDFViewer
} from '@react-pdf/renderer';

// create 2 columns left add navigation bar

const History = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadUserOrders()
    }, [])

    const loadUserOrders = () => getuserOrders(user.token).then(res => {
        console.log(JSON.stringify(res.data, null, 4));
        setOrders(res.data);
    })

    const showOrderInTable = (order) => {
        return <div>
            <p>Each order and it's Products</p>

            <table className='min-w-full text-center text-sm font-light mt-5 mb-5'>
                <thead className='border-b bg-neutral-800 font-medium text-white'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>Title</th>
                        <th scope='col' className='px-6 py-3'>Price</th>
                        <th scope='col' className='px-6 py-3'>Brand</th>
                        <th scope='col' className='px-6 py-3'>Color</th>
                        <th scope='col' className='px-6 py-3'>Count</th>
                        <th scope='col' className='px-6 py-3'>Shipping</th>
                    </tr>
                </thead>

                <tbody>
                    {order.products.map((p, i) => (
                        <tr key={i} className='border-b'>
                            <td className='p-2'><b>{p.product.title}</b></td>
                            <td className='p-2'>{p.product.price}</td>
                            <td className='p-2'>{p.product.brand}</td>
                            <td className='p-2'>{p.color}</td>
                            <td className='p-2'>{p.count}</td>
                            <td className='p-2'>{p.product.shipping === "Yes" ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    }

    const showDownloadLink = (order) => {
        return <div>
            <PDFDownloadLink document={
                <Document>
                    <Page size='A4'>
                        <View>
                            <Text>Section #1</Text>
                            <Text>Section #2</Text>
                        </View>
                    </Page>
                </Document>
            }
                className='<mt-15 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2'
                fileName='invoice.pdf'
            >
                Download PDF
            </PDFDownloadLink>
        </div>

    }

    const showEachOrders = () => orders.map((order, i) => (
        <div key={i} className='m-5 w-[80rem]  p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-xl hover:bg-white'>
            <ShowPaymentInfo order={order} />
            {/* function */}
            {showOrderInTable(order)}
            <div>
                <div>
                    <p className='mb-3'>PDF download</p>
                    <div>{showDownloadLink(order)}</div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className='bg-green-200 font-bold border p-4 grid  grid-cols-4 '>
            <UserNav />
            <div className="col-span-3 text-center">
                <div className='text-xl font-bold'>{orders.length > 0 ? 'User Purchased Orders' : ' No purchased Order'}</div>
                <div className='flex flex-col items-center justify-center '>
                    {showEachOrders()}
                </div>
            </div>
        </div>
    )
}

export default History



