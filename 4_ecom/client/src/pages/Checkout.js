import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { applyCoupon, emptyUserCart, getUserCart, saveUserAddress, createCashOrderForUser } from '../components/functions/user';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Checkout = () => {
    const dispatch = useDispatch();
    const { user, COD } = useSelector((state) => ({ ...state }));
    const couponTrueOrFalse = useSelector((state) => state.coupon);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    //reactquill
    const [address, setAddress] = useState("");
    //to confirm address have been Saved
    const [addressSaved, setAddressSaved] = useState(false);
    //coupon on state from input
    const [coupon, setCoupon] = useState('');
    //one we get response form server for discounted price handle it on state
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUserCart(user.token)
            .then(res => {
                console.log('user cart response', JSON.stringify(res.data, null, 4));
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            });
    }, []);


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
                //clearing the state out
                setTotalAfterDiscount(0)
                setCoupon('');
                toast.message('Cart is empty. Continue Shopping..')
            })
    };

    const saveAddressToDb = () => {
        // console.log(address);
        //     //<p>Rampur</p><p><strong>Chitrapur</strong></p><p>Nepal</p> Rich text element
        saveUserAddress(user.token, address).then((res) => {
            console.log('Response after saving on DB', res)
            setAddressSaved(true);
            if (res.data.ok) {
                setAddressSaved(true);
                toast.success("Address saved");
            }
        });
    };



    const showAddress = () => {
        return <>
            <ReactQuill theme='snow' value={address} onChange={setAddress} />
            <button onClick={saveAddressToDb} className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                Save
            </button>
        </>
    }

    const showProductSummary = () => {
        return <>
            <p>{products.map((p, i) => (
                <div key={i}>
                    <p>{p.product.title} ({p.color}) x {p.count} = {p.product.price * p.count} </p>
                </div>
            ))}</p>
            <hr />
        </>
    }

    const applyDiscountCoupon = () => {
        console.log("send coupon to backend", coupon);
        applyCoupon(user.token, coupon).then((res) => {
            console.log("RES ON COUPON APPLIED", res);
            if (res.data) {
                setTotalAfterDiscount(res.data.totalAfterDiscount);
                //update redux coupon applied true/false
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: true,
                })
            }
            if (res.data.err) {
                setDiscountError(res.data.err)
                //update redux coupon applied
                dispatch({
                    type: "COUPON_APPLIED",
                    payload: false,
                })
            }
        });
    };

    const showApplyCoupon = () => {
        return <>
            <input type='text'
                onChange={
                    (e) => {
                        setCoupon(e.target.value);
                        setDiscountError('');
                    }
                }
                value={coupon}
                className='bg-green-50 border border-green-500  placeholder-black-700  text-sm rounded-lg block w-1/4 p-2.5 outline-none' />
            <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none' onClick={applyDiscountCoupon}>Apply</button>
        </>
    };


    const createCashOrder = () => {
        // doit
        // COD will have value of True / False
        console.log('Sending async req for making Cash order req')
        createCashOrderForUser(user.token, COD).then(res => {
            console.log('USER CASH ORDER CREATED RES', res);
            //empty cart from redux, local Storage, reset coupon 
        })
        // createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
        //     console.log("USER CASH ORDER CREATED RES", res);
        //     // emptying cart from redux, local storage, resetcoupon, reset COD, redirect
        //     if (res.data.ok) {
        //         // emptying local storage
        //         if (typeof window !== "undefined") localStorage.removeItem("cart");
        //         // emptying out redux Cart
        //         dispatch(
        //             {
        //                 type: "ADD_TO_CART",
        //                 payload: [],
        //             });
        //         // empty redux coupon
        //         dispatch({
        //             type: "COUPON_APPLIED",
        //             payload: false,
        //         });
        //         // wiping out redux COD
        //         dispatch(
        //             {
        //                 type: "COD",
        //                 payload: false,
        //             }
        //         );
        //         // empty cart from backend
        //         emptyUserCart(user.token);
        //         // redirect
        //         setTimeout(() => {
        //             navigate("/user/history")
        //         }, 1000);
        //     }
        // });

    };

    return (
        <div>
            <div className='grid grid-cols-12 gap-4 p-4'>
                <div className='col-span-6 p-2 space-y-2'>
                    <h4 className='text-2xl font-bold '>Delivery Address</h4>
                    <div>{showAddress()}</div>
                    <hr />
                    <h4 className='text-xl font-bold'>Got Coupon?</h4>
                    <br />

                    <div>{showApplyCoupon()}</div>
                    <br />
                    {/* ***************conditional render to shoow error message*/}
                    {discountError && <p className='text-red-600 text-xl font-bold p-2'>{discountError}</p>}

                    {/* {JSON.stringify(discountError)} */}
                </div>
                <div className='col-span-6 space-y-2 p-2'>
                    <h4 className='text-2xl font-bold'>Order Summary</h4>
                    {/* <h1>total amount {total} total products {products.length}</h1>
                    {JSON.stringify(products)} */}
                    <hr />
                    <p>Products {products.length}</p>
                    <hr />
                    {showProductSummary()}
                    <p>Cart Total: {total}</p>

                    {totalAfterDiscount > 0 && (
                        <p className='bg-green-300 p-1'> Discounted: Total Payable
                            <span className='font-bold'> ${totalAfterDiscount}</span>
                        </p>
                    )}

                    <div>
                        <div>
                            {JSON.stringify}
                            {COD ? (
                                <button onClick={createCashOrder()} disabled={!addressSaved || !products.length}
                                    className='text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                                    Place Order
                                </button>
                            ) : (
                                <button onClick={() => navigate('/payment')} disabled={!addressSaved || !products.length}
                                    className='text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                                    Place Order
                                </button>
                            )}

                            {/* <button onClick={() => navigate('/payment')} disabled={!addressSaved || !products.length}
                                className='text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
                                Place Order
                            </button> */}
                            <button onClick={emptyCart} disabled={!products.length}
                                className='text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5 outline-none'>
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





