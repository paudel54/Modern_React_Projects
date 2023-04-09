const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.userCart = async (req, res) => {
    //console.log(req.body);
    const { cart } = req.body;
    let products = []

    const user = await User.findOne({ email: req.user.email }).exec();
    //checks if cart with logged in user id already exists
    let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();
    //Remove the cart once after each payment: to initialize a fresh cart for next purchase
    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log("Removed Old Cart");
    }
    for (let i = 0; i < cart.length; i++) {
        let object = {};
        //actual Product
        //count, color st from client side
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;
        //get price for creating total
        //query from db to check the price, if not someone can edit on front end and send low rate request to backend
        let { price } = await Product.findById(cart[i]._id).select('price').exec();
        object.price = price;

        products.push(object);
    }
    // console.log('products',products)
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    //console.log('cartTotal', cartTotal);
    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id,
    }).save();

    console.log('New Cart', newCart);
    res.json({ ok: true });
};