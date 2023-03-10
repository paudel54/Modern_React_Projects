// each collection described by model: 
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
// added multiple arguments
const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    role: {
        type: String,
        default: 'Subscriber',
    },

    cart: {
        type: Array,
        default: [],
    },
    address: String,
    // wishlist: [{ type: ObjectId, ref: "Product" }]
}, { timestamps: true });

// creating a model with .model method for  name. MODEL NAME IS IMPORTANT
module.exports = mongoose.model('User', userSchema)

// Mongodb is schema less: but with the help of mongoose we can make it to make it more ease 