const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { Article, Comment } = require("../../db");

/**
 * Get all articles
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllArticles = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const articles = await Article.paginate({}, { lean: true, page, limit, sort, populate: [
            { path: "author", select: "firstName lastName" },
            { path: "category" },
            { path: "tags" },
        ] });

        return res.status(200).json({ success: true, data: articles });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Get article by ID
 * @param {Request} req 
 * @param {Response} res 
 */
const getArticleById = async (req, res) => {
    const _id = req.params.id;

    try {
        const [article, comments] = Promise.all([
            Article.findOne({ _id }, null, { lean: true })
                .populate({ path: "author", select: "firstName lastName" })
                .populate({ path: "category" })
                .populate({ path: "tags" }),
            Comment.find({ article: _id }, { lean: true }),
        ]);

        return res.status(200).json({ success: true, data: { article, comments } });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Create a new article
 * @param {Request} req 
 * @param {Response} res 
 */
const createArticle = async (req, res) => {
    const author = req.user;

    const schema = Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
        category: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).optional(),
        coverImage: Joi.string().optional(),
        isDraft: Joi.boolean().optional(),
        isFeatured: Joi.boolean().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.author = author;

        data.slug = data.title.toLowerCase().replace(/\s/ig, "-");

        const article = (await new Article(data).save()).toObject();

        return res.status(200).json({ success: true, data: article });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Update article by ID
 * @param {Request} req 
 * @param {Response} res 
 */
const updateArticleById = async (req, res) => {
    const author = req.user;
    const _id = req.params.id;

    const schema = Joi.object().keys({
        slug: Joi.string().optional(),
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        category: Joi.string().optional(),
        tags: Joi.array().items(Joi.string()).optional(),
        coverImage: Joi.string().optional(),
        isDraft: Joi.boolean().optional(),
        isFeatured: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.slug = data.slug.toLowerCase().replace(/\s/ig, "-");

        await Article.updateOne({ _id, author }, data);

        return res.status(200).json({ success: true, message: "Article updated" });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Delete article by ID
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteArticleById = async (req, res) => {
    const _id = req.params.id;
    const author = req.user;

    try {
        Promise.all([
            Article.deleteOne({ _id, author: author._id })
                .populate({ path: "author", select: "firstName lastName" })
                .populate({ path: "category" })
                .populate({ path: "tags" }),
            Comment.deleteMany({ article: _id }, { lean: true }),
        ]);

        return res.status(200).json({ success: true, message: "Article and related comments deleted" });
    } catch(error) {
        return outErrors(res, error)
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticleById,
    deleteArticleById,
}