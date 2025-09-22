const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ArticleSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        requried: true,
    },
    content: {
        type: String,
        requried: true,
    },
    slug: {
        type: String,
        requried: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    tags: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Tag",
            default: null,
        }],
        default: [],
    },
    coverImage: {
        type: String,
        default: null,
    },
    isDraft: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, versionKey: false });

ArticleSchema.plugin(mongoosePaginate);

const Article = model("Article", ArticleSchema);

module.exports = Article;