const express = require('express');

const router = express.Router();

//middleWares
const { authCheck } = require("../middlewares/auth");
//controllers
const { userCart, getUserCart, emptyCart } = require("../controllers/user");

//saving user Cart, before checkout to db
router.post('/user/cart', authCheck, userCart);//saveCart
//get cart to checkout from db
router.get('/user/cart', authCheck, getUserCart);
//empty cart
router.delete('/user/cart', authCheck, emptyCart);

// router.get('/user', (req, res) => res.json({
//     data: 'You hit user Api endpoint',
//     name: "Sangeeta Karki",
//     address: "Melbrone"
// }))

module.exports = router