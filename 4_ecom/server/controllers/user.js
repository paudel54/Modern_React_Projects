const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const Order = require('../models/order');
var uniqueid = require('uniqid');

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
        let productFromDb = await Product.findById(cart[i]._id).select('price').exec();
        object.price = productFromDb.price;

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


// exports.emptyCart = async (req, res) => {
//     const user = await User.findOne({ email: req.user.email }).exec();
//     const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
//     res.json(cart);
// }

exports.emptyCart = async (req, res) => {
    console.log("empty cart");
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
    res.json(cart);
};

exports.saveAddress = async (req, res) => {
    //findOneAndUpdate, contains two parameter, how to find by and what to Update
    const userAddress = await User.findOneAndUpdate({ email: req.user.email }, { address: req.body.address }).exec();
    res.json({ ok: true });
}

exports.applyCouponToUserCart = async (req, res) => {
    const { coupon } = req.body;
    console.log("COUPON", coupon);

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (validCoupon === null) {
        return res.json({
            err: "Invalid coupon Your coupon might have expired or incorrect",
        });
    }
    console.log("VALID COUPON", validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
        .populate("products.product", "_id title price")
        .exec();

    console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

    // calculate the total after discount
    let totalAfterDiscount = (
        cartTotal -
        (cartTotal * validCoupon.discount) / 100
    ).toFixed(2); // 99.99

    Cart.findOneAndUpdate(
        { orderedBy: user._id },
        { totalAfterDiscount },
        { new: true }
    ).exec();
    //sending reponse inform of object
    res.json({ totalAfterDiscount });
};

//Cart item save as order and Empty the Cart
exports.createOrder = async (req, res) => {
    //request constains info from client side
    //console.log(req.body);
    const { paymentIntent } = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email }).exec();

    let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

    let newOrder = await new Order({
        products,
        paymentIntent,
        orderedBy: user._id,
    }).save();

    //decrement quantity, increment sold, mongoose bulkOption
    let bulkOption = products.map((item) => {
        return {
            updateOne: {
                //update based on product id
                filter: { _id: item.product._id }, //IMPORTANT item.product
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            }
        }
    })

    let updated = await Product.bulkWrite(bulkOption, {});
    console.log('PRODUCT QUANTITY-- AND SOLD++', updated);

    console.log('NEW ORDER SAVED', newOrder);
    res.json({ ok: true });
}
//to show user purchase history
exports.orders = async (req, res) => {
    let user = await User.findOne({ email: req.user.email }).exec()
    //query orders, based on user order id: products is array and one level down
    let userOrders = await Order.find({ orderedBy: user._id })
        .populate('products.product')
        .exec();
    res.json(userOrders);
}

// addToWishlist
// wishlist
// removeFromWishlist

// addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;

    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
    const list = await User.findOne({ email: req.user.email })
        .select("wishlist")
        .populate("wishlist")
        .exec();

    res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
    const { productId } = req.params;
    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $pull: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });
};

//Creating new order for cash on delivary and saving it to DB and sending a response
//Cart item save as order and Empty the Cart
// exports.createCashOrder = async (req, res) => {
//     //request constains info from client side
//     //console.log(req.body);
//     const { COD } = req.body;

//     const user = await User.findOne({ email: req.user.email }).exec();
//     //if COD is true, create order with status of Cash On Delivery

//     if (!COD) return res.status(400).send('Create Cash Order Failed');

//     let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

//     let newOrder = await new Order({
//         products: userCart.products,
//         paymentIntent: {
//             id: uniqueid(),
//             amount: userCart.cartTotal,
//             currency: "usd",
//             status: "Cash On Delivery",
//             created: Date.now(),
//             payment_method_types: ["cash"],
//         },
//         orderedBy: user._id,
//     }).save();

//     //decrement quantity, increment sold, mongoose bulkOption
//     let bulkOption = userCart.products.map((item) => {
//         return {
//             updateOne: {
//                 //update based on product id
//                 filter: { _id: item.product._id }, //IMPORTANT item.product
//                 update: { $inc: { quantity: -item.count, sold: +item.count } },
//             }
//         }
//     })

//     let updated = await Product.bulkWrite(bulkOption, {});
//     console.log('PRODUCT QUANTITY-- AND SOLD++', updated);
//     console.log('NEW ORDER SAVED', newOrder);
//     res.json({ ok: true });
// }

exports.createCashOrder = async (req, res) => {
    const { COD } = req.body;
    // if COD is true, create order with status of Cash On Delivery

    if (!COD) return res.status(400).send("Create cash order failed");

    const user = await User.findOne({ email: req.user.email }).exec();

    let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

    let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
            id: uniqueid(),
            amount: userCart.cartTotal,
            currency: "usd",
            status: "Cash On Delivery",
            created: Date.now(),
            payment_method_types: ["cash"],
        },
        orderedBy: user._id,
    }).save();

    // decrement quantity, increment sold
    let bulkOption = userCart.products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id }, // IMPORTANT item.product
                update: { $inc: { quantity: -item.count, sold: +item.count } },
            },
        };
    });

    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

    console.log("NEW ORDER SAVED", newOrder);
    res.json({ ok: true });
};



