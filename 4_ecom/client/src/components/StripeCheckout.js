import React, { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentIntent } from './functions/stripe';
import { useNavigate } from 'react-router-dom'

const StripeCheckout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    //state management
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    //useEffect will make backend request to get clientSecret and put into State clientSecreat value 
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const element = useElements();

    // Request ot backend when component mounts with useEffect

    useEffect(() => {
        createPaymentIntent(user.token)
            .then(res => {
                console.log('create payment intent', res.data);
                setClientSecret(res.data);
            })
    }, []);

    const handleSubmit = async (e) => {
        //
    }

    const handleChange = async (e) => {
        //
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
                <form id="payment-form" className='stripe-form' onSubmit={handleSubmit}>
                    <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                    <button className='stripe-button' disabled={processing || disabled || succeeded}>
                        <span id="button-text">{processing ? <div className='spinner' id="spinner"></div> : "Pay"}</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default StripeCheckout




