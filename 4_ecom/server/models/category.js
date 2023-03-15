const mongoose = require('mongoose');
// const { ObjectId } = mongoose.Schema


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        //user might have white space we want to eliminate or ignore into database: // react woulde be //react
        trim: true,
        required: true,
        //minimum length must be 3 character if not would throw message as too short
        minlength: [2, 'Too short'],
        maxlength: [32, 'Too long'],
    },
    //slug would be genereated on own controller not from frontend> 
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    }
}, { timestamps: true });

//create mongoose module which helps to interat with database: model name and 2nd paramater is category is schema
module.exports = mongoose.model('Category', categorySchema);