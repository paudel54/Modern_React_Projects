const express = require('express');

const router = express.Router();

//middleWares
const { authCheck } = require("../middlewares/auth");
//controllers
const { userCart } = require("../controllers/user");

//saving user Cart
router.post('/cart', authCheck, userCart);//saveCart


// router.get('/user', (req, res) => res.json({
//     data: 'You hit user Api endpoint',
//     name: "Sangeeta Karki",
//     address: "Melbrone"
// }))

module.exports = router