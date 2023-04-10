const Coupon = require('../models/coupon');

//create, remove, list

exports.create = async (req, res) => {
    try {
        // console.log('Here  is coupon requuest body', req.body);
        const { name, expiry, discount } = req.body.coupon;
        //take the info form client side and save to db and send response back to client
        res.json(await new Coupon({ name, expiry, discount }).save());
    } catch (e) {
        console.log(e)
    }
}
//remove
exports.remove = async (req, res) => {
    try {
        res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
    } catch (e) {

    }
}

//list
exports.list = async (req, res) => {
    try {
        res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
    } catch (e) {

    }
}



