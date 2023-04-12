import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

//load Stripe Outside of Component render to avoid recreating Stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <div>
            <div className='font-bold text-xl text-center'>
                Complete Your Purchase!
            </div>
            <Elements stripe={promise}>
                <div className='grid grid-cols12'>
                    <div className='col-span-8'>
                        <div className='font-bold text-xl text-center text-green-700'>
                            Stripe Checkout Component
                        </div>
                    </div>
                    <div className='col-span-4'>

                    </div>
                </div>
            </Elements>
        </div>
    )
}

export default Payment
