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
            <div className='font-bold text-xl text-center'>
                Complete Your Purchase!
            </div>
            <Elements stripe={promise}>
                <div className='grid grid-cols-12'>
                    <div className='col-span-8'>
                        <div className='font-bold text-xl text-green-700'>
                            Stripe Checkout Component
                            <StripeCheckout />
                        </div>
                    </div>
                    <div className='col-span-4'>
                        Krishna JI
                    </div>
                </div>
            </Elements>
        </div>
    )
}

export default Payment
