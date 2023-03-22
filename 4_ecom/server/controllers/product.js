const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        console.log(req.body.slug);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        console.log(err);
        // res.status(400).send("Create product failed");
        //sending error message to frontend to show it on proper way 
        res.status(400).json({
            err: err.message,
        });
    }
};

// exports.read = async (req, res) => {
//     //query to database: shows list of products in from db 
//     let products = await Product.find({});
//     res.json(products);
// }

//fetch product based on count
exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        //populate gives entire info, if not used then would only provide an id:
        .populate('category')
        .populate('subs')
        .sort([['createdAt', 'desc']])
        .exec()
    res.json(products);
}