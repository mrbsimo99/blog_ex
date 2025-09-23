const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { Article, Comment } = require("../../db");

/**
 * Get all articles
 */
const getAllArticles = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const articles = await Article.paginate({}, {
            lean: true,
            page,
            limit,
            sort,
            populate: [
                { path: "author", select: "firstName lastName" },
                { path: "category" },
                { path: "tags" },
            ]
        });

        return res.status(200).json({ success: true, data: articles });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Get article by ID
 */
const getArticleById = async (req, res) => {
    const _id = req.params.id;

    try {
        // Fix: await Promise.all e lean
        const [article, comments] = await Promise.all([
            Article.findOne({ _id }).lean()
                .populate({ path: "author", select: "firstName lastName" })
                .populate({ path: "category" })
                .populate({ path: "tags" }),
            Comment.find({ article: _id }).lean()
        ]);

        return res.status(200).json({ success: true, data: { article, comments } });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Create a new article
 */
const createArticle = async (req, res) => {
    const author = req.user;

    const schema = Joi.object({
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
        return outErrors(res, error);
    }
}

/**
 * Update article by ID
 */
const updateArticleById = async (req, res) => {
    const author = req.user;
    const _id = req.params.id;

    const schema = Joi.object({
        slug: Joi.string().optional(),
        title: Joi.string().optional(),
        content: Joi.string().optional(),
        category: Joi.string().optional(),
        tags: Joi.array().items(Joi.string()).optional(),
        coverImage: Joi.string().optional(),
        isDraft: Joi.boolean().optional(),
        isFeatured: Joi.boolean().optional(), 
    });

    try {
        const data = await schema.validateAsync(req.body);

        if (data.slug) {
            data.slug = data.slug.toLowerCase().replace(/\s/ig, "-");
        }

        await Article.updateOne({ _id, author }, data);
        return res.status(200).json({ success: true, message: "Article updated" });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Delete article by ID
 */
const deleteArticleById = async (req, res) => {
    const _id = req.params.id;
    const author = req.user;

    try {
        await Promise.all([
            Article.deleteOne({ _id, author: author._id }),
            Comment.deleteMany({ article: _id })
        ]);

        return res.status(200).json({ success: true, message: "Article and related comments deleted" });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Create a comment for an article
 */
const postComment = async (req, res) => {
    const author = req.user;
    const articleId = req.params.id;
    const { content } = req.body;

    if (!content) return res.status(400).json({ success: false, message: "Comment content is required" });

    try {
        const comment = new Comment({ content, author: author._id, article: articleId });
        await comment.save();

        return res.status(201).json({ success: true, data: comment });
    } catch(error) {
        return outErrors(res, error);
    }
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticleById,
    deleteArticleById,
    postComment, 
};
