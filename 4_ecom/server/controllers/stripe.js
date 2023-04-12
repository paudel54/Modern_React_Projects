const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
    //later apply coupon// gets true/false value from redux store
    // console.log(req.body)
    // return
    const { couponApplied } = req.body;

    //later calculate price
    //1.find user
    const user = await User.findOne({ email: req.user.email }).exec();
    //2.get user cart total
    //check into db for more visualizaiton of destructruing 
    const { cartTotal, totalAfterDiscount } = await Cart.findOne({ orderedBy: user._id }).exec();
    // console.log("Total after discout % ", totalAfterDiscount);
    // return;
    let finalAmount = 0;
    //create payment intent with order amount and currency

    if (couponApplied && totalAfterDiscount) {
        //since stripe takes amount on cents so multiply by 100
        finalAmount = (totalAfterDiscount * 100);
    } else {
        finalAmount = (cartTotal * 100);
    }

    const paymentIntent = await stripe.paymentIntents.create({
        //sending amount on cents so multiply by 100
        amount: finalAmount,
        currency: "usd",
    });

    //sendding respose to client side with client_secret
    //Sending info to clients so we can show them the info!
    res.send({
        clientSecret: paymentIntent.client_secret,
        cartTotal,
        totalAfterDiscount,
        payable: finalAmount,
    })
}


//once credit Card input is received we will confirm card payment using stripe from client side, which will charge the amount
//that is in the our server's paymentIntent
