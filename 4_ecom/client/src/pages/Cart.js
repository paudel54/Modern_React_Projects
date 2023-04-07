import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
    //GET FROM REDUX STORE
    const { cart, user } = useSelector((state) => ({ ...state }));
    //TO UPDATE REDUX
    const dispatch = useDispatch()

    const getTotal = () => {
        return cart.reduce((current, next) => {
            return current + next.count * next.price
        }, 0)
    }

    return (
        <div>
            <div>
                {/* {JSON.stringify(cart)} */}
                <h4 className='text-xl font-bold'>Cart / {cart.length} Product </h4>
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-8'>
                    {!cart.length ? <p>No Products in Cart. : <link to="/shop">Continue Shopping</link> </p> : ("Show Cart Items")}
                </div>

                <div className='col-span-4 space-y-3'>
                    <h4 className='text-2xl font-bold -mt-5'>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    {cart.map((c, i) => (
                        <div key={i}>
                            <p> {c.title} x {c.count} = ${c.price * c.count}</p>
                        </div>
                    ))}
                    <hr />
                    Total: <b>${getTotal()}</b>
                    <hr />
                    {
                        user ? (<button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'> Proceed to Checkout</button>)
                            : (<button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>Login to Checkout</button>)
                    }
                </div>

            </div>
        </div>
    )
}

export default Cart
