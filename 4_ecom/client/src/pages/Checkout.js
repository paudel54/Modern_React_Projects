import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { emptyUserCart, getUserCart } from '../components/functions/user';

const Checkout = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                console.log('user cart response', JSON.stringify(res.data, null, 4));
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            })
    }, [])


    const emptyCart = () => {
        //empty from local storage, redux store, backend
        //remove from localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem("cart")
        }
        //remove from Redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        });
        //remove from Backend
        emptyUserCart(user.token)
            .then(res => {
                setProducts([])
                setTotal(0)
                toast.message('Cart is empty. Continue Shopping..')
            })
    }

    const saveAddressToDb = () => {
        //
    }

    return (
        <div>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-6 p-2 space-y-2'>
                    <h4 className='text-2xl font-bold '>Delivery Address</h4>
                    <div>textArea</div>
                    <button onClick={saveAddressToDb} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                        Save
                    </button>
                    <hr />
                    <h4 className='text-xl font-bold'>Got Cupon?</h4>
                    <br />
                    Coupon input and apply Button
                </div>
                <div className='col-span-6 space-y-2 p-2'>
                    <h4 className='text-2xl font-bold'>Order Summary</h4>
                    {/* <h1>total amount {total} total products {products.length}</h1>
                    {JSON.stringify(products)} */}
                    <hr />
                    <p>Products {products.length}</p>
                    <hr />
                    <p>{products.map((p, i) => (
                        <div key={i}>
                            <p>{p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count} </p>
                        </div>
                    ))}</p>
                    <hr />
                    <p>Cart Total: {total}</p>

                    <div>
                        <div>
                            <button className='text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                                Place Order
                            </button>
                            <button onClick={emptyCart} disabled={!products.length} className='text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                                Empty Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
