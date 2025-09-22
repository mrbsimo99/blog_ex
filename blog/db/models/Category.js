const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CategorySchema = new Schema({
    name: {
        type: String,
        requried: true,
    },
    description: {
        type: String,
        default: null,
    },
}, { timestamps: true, versionKey: false });

CategorySchema.plugin(mongoosePaginate);

const Category = model("Category", CategorySchema);

module.exports = Category;