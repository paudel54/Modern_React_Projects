const express = require('express');

const router = express.Router();

//middleWares
const { authCheck } = require("../middlewares/auth");
//controllers
const { userCart, getUserCart, emptyCart, saveAddress, applyCouponToUserCart, createOrder } = require("../controllers/user");

//saving user Cart, before checkout to db
router.post('/user/cart', authCheck, userCart);//saveCart
//get cart to checkout from db
router.get('/user/cart', authCheck, getUserCart);
//empty cart
router.delete('/user/cart', authCheck, emptyCart);
//adding user Address:
router.post("/user/address", authCheck, saveAddress);
//coupon
router.post("/user/cart/coupon", authCheck, applyCouponToUserCart);
//oder after getting stripe Response:
router.post("/user/order", authCheck, createOrder);

// router.get('/user', (req, res) => res.json({
//     data: 'You hit user Api endpoint',
//     name: "Sangeeta Karki",
//     address: "Melbrone"
// }))

module.exports = router