const express = require('express');
const router = express.Router();


// middlewares to import
const { authCheck } = require("../middlewares/auth.js");

// controllers to import


// imports
//!!!We can have exports from routes with multiple methods so on import must be destructred : regular var name results in ERROR
const { createOrUpdateUser } = require('../controllers/auth')

// testing middleware
// const myMiddleware = (req, res, next) => {
//     console.log(' I am middleware testier....');
//     next();
// };




// router.get('/create-or-update-user', createOrUpdateUser);
//we need to get data from frontend and send to server so post method is used

// we get req auth check middleware runs and then controller function gets executed!
// application of middleware
router.post('/create-or-update-user', authCheck, createOrUpdateUser);

// middleware on test 
// router.get('/testing', myMiddleware, (req, res) => {
//     res.json({
//         data: 'you have acheived middleware',
//     })
// })



// Export router:
module.exports = router;



