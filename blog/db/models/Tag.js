const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TagSchema = new Schema({
    name: {
        type: String,
        requried: true,
    },
}, { timestamps: true, versionKey: false });

TagSchema.plugin(mongoosePaginate);

const Tag = model("Tag", TagSchema);

module.exports = Tag;