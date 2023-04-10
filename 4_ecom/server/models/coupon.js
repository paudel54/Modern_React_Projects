const mongoose = require("mongoose");
const { objectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true,
            uppercase: true,
            required: 'Name is Required',
            minlength: [6, "Length should be minimum 6 characters"],
            maxlength: [12, "Length should not exceed 12 characters"]
        },
        expiry: {
            type: Date,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },
    },
    { timestamp: true }

);

module.exports = mongoose.model("Coupon", couponSchema);