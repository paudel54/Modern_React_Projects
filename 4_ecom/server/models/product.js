const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            //check on db to check trim fn
            trim: true,
            required: true,
            maxlength: 32,
            text: true
        },

        //generate slug based on title
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true
        },

        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },

        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 32,
        },

        category: {
            type: ObjectId,
            //ref to category model
            ref: "Category",
        },
        //based on category there would be many  sub cateegories so subs for proper indication
        //subs would be type of array containning objects
        subs: [{
            type: ObjectId,
            ref: "Sub",
        }],

        quantity: Number,

        // sold: {
        //     type: Number,
        //     default: 0
        // },

        images: {
            type: Array
        },

        shipping: {
            type: String,
            enum: ["Yes", "No"]
        },

        color: {
            type: String,
            //the frontend side should only send value defined on enum in backend else anything different won't be saved onto database:
            enum: ["Black", "Brown", "Silver", "White", "Blue"]
        },

        brand: {
            type: String,
            enum: ["Apple", "Samsung", "Microsoft", "Lenevo", "Asus"],
        },

        // ratings: [
        //     {
        //         star: Number,
        //         //each star would be asscociated with use
        //         postedBy: { type: ObjectId, ref: "User" },
        //     }
        // ]


    }, { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema);