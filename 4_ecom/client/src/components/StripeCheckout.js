import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from './functions/stripe';
import { useNavigate, Link } from 'react-router-dom';

import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import Laptop from '../images/computer/ban1.png'


const StripeCheckout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, coupon } = useSelector((state) => ({ ...state }));
    //state management
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    //useEffect will make backend request to get clientSecret and put into State clientSecreat value 
    const [clientSecret, setClientSecret] = useState('');

    //state variable to store info from backend response
    const [cartTotal, setCartTotal] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [payable, setPayable] = useState(0);

    const stripe = useStripe();
    const element = useElements();

    // Request ot backend when component mounts with useEffect

    useEffect(() => {
        createPaymentIntent(user.token, coupon)
            .then(res => {
                console.log('create payment intent', res.data);
                setClientSecret(res.data.clientSecret);
                //additional Response Received from successful payment
                //update state from backend to state variable
                setCartTotal(res.data.cartTotal);
                setTotalAfterDiscount(res.data.totalAfterDiscount);
                setPayable(res.data.payable);
            })
    }, []);

    const handleSubmit = async (e) => {
        //form submit
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                //cardElement from CardElement Component from the return:
                card: element.getElement(CardElement),
                billing_details: {
                    name: e.target.name.value,
                },
            },
        });

        if (payload.error) {
            setError(`Payment Failed ${payload.error.message}`)
        } else {
            //here you get Result after Successful Payment
            //create order and save in database for admin to process
            //empty user cart from redux store and local storage
            //onSuccess logs this into console
            // console.log(JSON.stringify(payload, null, 4))
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (e) => {
        //listen for changes in the Card element
        //and display any errors as the customer types their caird details
        setDisabled(e.empty) //disable pay button if errors
        setError(e.error ? e.error.message : ""); //show error message
    }

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };


    return (
        <div>
            <div>
                {
                    !succeeded && <div> {coupon && totalAfterDiscount !== undefined ? (<p className='text-green-600 p-2 bg-orange-200 rounded-xl text-xl font-bold'> {`Total After Discount: $${totalAfterDiscount}`} </p>) : (<p className='text-red-600 bg-orange-200 rounded-xl text-xl font-bold'> No Coupon Applied</p>)} </div>
                }
                <div className='text-center pb-5'>
                    <Card
                        cover={<img alt='icon' src={Laptop} style={{
                            height: '200px',
                            objectFit: 'cover',
                            marginBottom: '-50px'
                        }}
                        />}
                        actions={[
                            <>
                                <DollarOutlined className='' /> <br />
                                Total: $ {cartTotal}
                            </>,
                            <>
                                <CheckOutlined className='' /> <br />
                                Total Payable: $ {(payable / 100).toFixed(2)}
                            </>,

                        ]}
                    />


                </div>


                <form id="payment-form" className='stripe-form' onSubmit={handleSubmit}>
                    <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                    <button className='stripe-button' disabled={processing || disabled || succeeded}>
                        <span id="button-text">{processing ? <div className='spinner' id="spinner"></div> : "Pay"}</span>
                    </button>
                    {error && <div> {error}</div>}
                    <br />
                    <p className={succeeded ? 'bg-green-300 p-2 text-sm border rounded text-gray-600' : 'collapse'}>
                        Payment Successful.<Link to="/user/history"> <span className='text-blue-600 font-bold'>&nbsp; Checkout Purchase History </span> </Link>
                    </p>

                </form>
                {/* {JSON.stringify(clientSecret)} */}
                {/* {JSON.stringify(succeeded)} */}

            </div>
        </div>
    )
}

export default StripeCheckout




