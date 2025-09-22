const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true,
    },
    content: {
        type: String,
        requried: true,
    },
    isAuthor: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, versionKey: false });

CommentSchema.plugin(mongoosePaginate);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;