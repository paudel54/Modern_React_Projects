const Category = require('../models/category');
const slugify = require('slugify');
const Sub = require("../models/category")

exports.create = async (req, res) => {
    try {
        //name we get from frontend and based on the name we create a slug
        // console.log('this is category request ', req.body)
        const { name } = req.body;
        //uses the schema model to fillup category and send response back after filling up data into db
        const category = await new Category({ name: name, slug: slugify(name) }).save();
        res.json(category);
    } catch (e) {
        console.log(e);
        res.status(400).send('Create Category  Failed');
    }
};

// list to show public withoud admin check or auth check 
//lists out all the availabel data from database model:
exports.list = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};

// if i want to have only one types of category then: it's done by targeting slug
exports.read = async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    // if async and await was not used on then exec() this fn contains call back handlers. with (err, data)
    res.json(category);
};

exports.remove = async (req, res) => {
    try {
        // query database based on the slug!
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
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
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated)
    } catch (err) {
        res.status(400).send("create update failed")
    }
};
//we are writing controller.
//for sub category becasue each subCategory has parent category
exports.getSubs = async (req, res) => {
    //find based on parent
    Sub.find({ parent: req.params._id }).exec((err, subs) => {
        if (err) console.log(err);
        res.json(subs);
    });
}