//client function to send req to server on particular endpoint
import axios from 'axios'
//post, url, empty body, headers with auth-token
export const createPaymentIntent = (authtoken, coupon) => axios.post(`${process.env.REACT_APP_API}/create-payment-intent`,
    {
        couponApplied: coupon
    },
    {
        headers: {
            authtoken,
        },
    }
);
