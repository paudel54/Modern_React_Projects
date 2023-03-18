const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        //name we get from frontend and based on the name we create a slug
        // console.log('this is category request ', req.body)
        const { name, parent } = req.body;
        //uses the schema model to fillup category and send response back after filling up data into db
        const category = await new Sub({ name: name, parent, slug: slugify(name) }).save();
        res.json(category);
    } catch (e) {
        console.log('Sub Create Error', e);
        res.status(400).send('Create Sub  Failed');
    }
};

// list to show public withoud admin check or auth check 
//lists out all the availabel data from database model:
exports.list = async (req, res) => {
    res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

// if i want to have only one types of category then: it's done by targeting slug
exports.read = async (req, res) => {
    let sub = await Sub.findOne({ slug: req.params.slug }).exec();
    // if async and await was not used on then exec() this fn contains call back handlers. with (err, data)
    res.json(sub);
};

exports.remove = async (req, res) => {
    try {
        // query database based on the slug!
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Category delete failed");
    }
};

exports.update = async (req, res) => {
    //update based on slug or category name
    //category have only one name feild  
    const { name } = req.body; //HP to dell
    try {
        //based on the first argument, we find category: once we find we need update: 2nd arg  name from req.body destrucrtured
        //3rd arg: to send recent json info
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated)
    } catch (err) {
        res.status(400).send("category update failed")
    }
};


