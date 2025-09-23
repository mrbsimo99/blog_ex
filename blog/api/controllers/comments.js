const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { Comment, Article } = require("../../db");

/**
 * Get all article's comments
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllCommentsByArticleId = async (req ,res) => {
    const article_id = req.params.article_id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const comments = await Comment.paginate({ article: article_id }, { lean: true, page, limit, sort, populate: [
            { path: "user", select: "firstName lastName" },
        ] });

        return res.status(200).json({ success: true, data: comments });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Get all article's comments
 * @param {Request} req 
 * @param {Response} res 
 */
const createArticleComment = async (req ,res) => {
    const user = req.user;
    const article_id = req.params.article_id;

    const schema = Joi.object().keys({
        content: Joi.string().required(),
    })

    try {
        const data = await schema.validateAsync(req.body);

        data.user = user._id;
        data.article = article_id;

        const article = await Article.findOne({ _id: article_id }, "author", { lean: true });

        data.isAuthor = user._id == article.author;

        const comment = (await new Comment(data).save()).toObject();

        return res.status(200).json({ success: true, data: comment });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Update comment by id
 * @param {Request} req 
 * @param {Response} res 
 */
const updateCommentById = async (req ,res) => {
    const user = req.user;
    const _id = req.params.id;

    const schema = Joi.object().keys({
        content: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Comment.updateOne({ _id, user: user._id }, data);

        return res.status(200).json({ success: true, message: "Comment updated" });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Delete comment by id
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteCommentById = async (req ,res) => {
    const user = req.user;
    const _id = req.params.id;

    try {
        await Comment.deleteOne({ _id, user: user._id });
        return res.status(200).json({ success: true, message: "Comment deleted" });
    } catch(error) {
        return outErrors(res, error)
    }
}


module.exports = {
    getAllCommentsByArticleId,
    createArticleComment,
    updateCommentById,
    deleteCommentById,
}