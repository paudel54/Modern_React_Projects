const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: "Name is Required",
            minlength: [2, "Length Too Short"],
            maxlength: [32, "Too Long"]
        },

        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        // we want to refer parent category by: parent category model name:
        //refering to CategoryModel
        parent: { type: ObjectId, ref: "Category", required: true }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Sub", subSchema);
