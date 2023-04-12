const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    //later apply coupon
    //later calculate price
    //1.find user
    const user = await User.findOne({ email: req.user.email }).exec();
    //2.get user cart total
    //check into db for more visualizaiton of destructruing 
    const { cartTotal } = await Cart.findOne({ orderedBy: user._id }).exec();
    console.log('Cart Total Charge', cartTotal);
    //create payment intent with order amount and currency


    const paymentIntent = await stripe.paymentIntents.create({
        //sending amount on cents so multiply by 100
        amount: cartTotal * 100,
        currency: "usd",
    });

    //sendding respose to client side with client_secret
    res.send({
        clientSecret: paymentIntent.client_secret,
    })
}


//once credit Card input is received we will confirm card payment using stripe from client side, which will charge the amount
//that is in the our server's paymentIntent
