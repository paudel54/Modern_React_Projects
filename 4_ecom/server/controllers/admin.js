//Controller Status Update For Admin Backend.
const Order = require('../models/order');

//admin can fetch all the info from db
exports.orders = async (req, res) => {
    let allOrders = await Order.find({})
        .sort("-createdAt")
        .populate("products.product")
        .exec();

    res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
    // console.log(req.body);
    // return;
    //destructure it from client side {esp for enum values from db "Not Processed", " Processing","Dispatched", "Cancelled", "Completed"}
    const { orderId, orderStatus } = req.body;

    let updated = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus },
        //new  ture helps to send updated current data to client side
        { new: true }
    ).exec();

    res.json(updated);
};
