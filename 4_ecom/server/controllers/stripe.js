const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    //later apply coupon
    //later calculate price

    const paymentIntent = await stripe.paymentIntent.create(
        {
            amount: 100,
            currency: "usd"
        }
    );
    //sendding respose to client side with client_secret
    res.send({
        clientSecret: paymentIntent.client_secret,
    })
}


//once credit Card input is received we will confirm card payment using stripe from client side, which will charge the amount
//that is in the our server's paymentIntent
