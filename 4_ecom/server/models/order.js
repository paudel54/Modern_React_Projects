const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema;
// "Added Order Schema to save data after getting stripe payment response"
//each order will have  Array of Products
const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                //will refer to Product Model
                ref: 'Product'
            },
            count: Number,
            color: String,
        },
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: 'Not Processed',
        enum: [
            "Not Processed",
            "Cash On Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Completed"
        ]
    },
    orderedBy: {
        type: ObjectId, ref: "User"
    },
}, { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema);
//tweet what exactly is enum in JS or programming and why is it used tw