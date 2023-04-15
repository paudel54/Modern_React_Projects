const express = require('express');

const router = express.Router();

//middleWares
const { authCheck } = require("../middlewares/auth");
//controllers
const {
    userCart,
    getUserCart,
    emptyCart,
    saveAddress,
    applyCouponToUserCart,
    createOrder,
    orders,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    createCashOrder
} = require("../controllers/user");

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
// router.post("/user/order", authCheck, createOrder);
//end point for Cash on Delivery
// router.post('/user/cash-order', authCheck, createCashOrder); //cod
router.post("/user/order", authCheck, createOrder); // stripe
router.post("/user/cash-order", authCheck, createCashOrder); // cod
//to show user's history of purchase:
router.get('/user/orders', authCheck, orders);

//wishlist//    addToWishlist||removeFromWishlist
// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

// router.get('/user', (req, res) => res.json({
//     data: 'You hit user Api endpoint',
//     name: "Sangeeta Karki",
//     address: "Melbrone"
// }))
module.exports = router

