const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.userCart = async (req, res) => {
    //console.log(req.body);
    const { cart } = req.body;
    //final product would be filled on this array
    let products = []

    const user = await User.findOne({ email: req.user.email }).exec();
    //checks if cart with logged in user id already exists
    // let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();
    // //Remove the cart once after each payment: to initialize a fresh cart for next purchase
    // if (cartExistByThisUser) {
    //     await cartExistByThisUser.remove();
    //     console.log("removed old cart");
    //     console.log('this is Cart existed by USer inside Condition', cartExistByThisUser);
    // }
    //modifying final before proceed to checkout
    let cartExistByThisUser = await Cart.findOne({ oooooorderedBy: user._id }).exec();
    console.log('this is Cart existed by USer inside Condition', cartExistByThisUser);
    if (cartExistByThisUser) {
        cartExistByThisUser.remove()
        console.log("removed old cart");
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
    console.log('products Updated', products)
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

    // console.log('New Cart------>', newCart);
    res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();
    let cart = await Cart.findOne({ orderedBy: user._id })
        .populate('products.product', '_id title price totalAfterDiscount')
        .exec()
    const { products, cartTotal, totalAfterDiscount } = cart;
    res.json({ products, cartTotal, totalAfterDiscount })
    //access onto frontend with . req.data.products, req.data.cartTotal, ...
}

