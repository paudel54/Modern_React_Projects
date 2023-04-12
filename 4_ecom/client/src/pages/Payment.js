import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';

//load Stripe Outside of Component render to avoid recreating Stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <div>
            <div className='font-bold text-2xl text-center mt-10'>
                Complete Your Purchase!
            </div>
            <Elements stripe={promise}>
                <div className='text-center'>
                    <div className='font-bold text-xl w-1/2  mx-auto mt-10 p-5'>
                        <StripeCheckout />
                    </div>
                </div>
            </Elements>
        </div>
    )
}

export default Payment
