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

exports.remove = async (req, res) => {
    try {
        //find based on slug and delete
        const deleted = await Product.findOneAndRemove({ slug: req.params.slug }).exec();
        res.json(deleted);
    }
    catch (e) {
        console.log(e);
        return res.status(400).send('Product Delete failed');

    }
}

exports.read = async (req, res) => {
    //find product based on slug and return that
    const product = await Product.findOne({ slug: req.params.slug })
        //populate implies please display linked object id all of their entities and atrributes:
        .populate('category')
        .populate('subs')
        .exec();
    res.json(product);
}

exports.update = async (req, res) => {
    try {
        //on update slug would be updated so, old web links can still sustain.
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        //findOneAndUpdate takes copule args, 1st: based on what you want to update
        //2nd arg: once product is found what do you want to update: updates form feild on product db schema
        //3rd arg to send recently updated information 
        const updated = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true }).exec();
        res.json(updated);
    }
    catch (e) {
        console.log('PRODUCT UPDATE ERROR---->', e)
        return res.status(400).json({
            err: err.message,
        });
    }
}

exports.list = async (req, res) => {
    // console.table(req.body);
    try {
        //query product from database: and sort on basis of time for new 
        //sort createdAt/UpdatedAt order desc/asc, limit 3: no of  
        const { sort, order, page } = req.body
        //if no page default 1
        const currentPage = page || 1;
        const perPage = 3; //3
        //query to Product schema
        const products = await Product.find({})
            //skip here is only fretching out  
            .skip((currentPage - 1) * perPage)
            .populate('category')
            .populate('subs')
            .sort([[sort, order]])
            .limit(perPage)
            .exec();
        res.json(products);
    }
    catch (e) {
        console.log(e);
    }
}

//mongoose method to get total count: estimated total count:
//backend controller to fetch collection from db and send it to server
exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
};