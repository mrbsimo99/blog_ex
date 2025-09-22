const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { User, Article, Comment } = require("../../db");
const { hashPassword } = require("../../utils/auth");

/**
 * Get current user information
 * @param {Request} req 
 * @param {Response} res 
 */
const getMeInfo = async (req, res) => {
    try {
        return res.status(200).json({ success: true, data: { ...req.user } });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Get current author articles
 * @param {Request} req 
 * @param {Response} res 
 */
const getMeArticles = async (req, res) => {
    const user = req.user;
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const articles = await Article.paginate({ author: user._id }, { lean: true, page, limit, sort, populate: [
            { path: "author", select: "firstName lastName" },
            { path: "category" },
            { path: "tags" },
        ] });

        return res.status(200).json({ success: true, data: articles });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Get current author articles
 * @param {Request} req 
 * @param {Response} res 
 */
const getMeArticleComments = async (req, res) => {
    const article_id = req.params.article_id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const comments = await Comment.paginate({ article: article_id }, { lean: true, page, limit, sort, populate: [
            { path: "user", select: "firstName lastName" },
        ] });

        return res.status(200).json({ success: true, data: articles });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Update current user informarion
 * @param {Request} req 
 * @param {Response} res 
 */
const updateMeInfo = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await User.updateOne({ _id: user._id }, { ...data });

        return res.status(200).json({ success: true, message: "User informations updated" });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Update current user password
 * @param {Request} req 
 * @param {Response} res 
 */
const updateMePassword = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        password: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.password = hashPassword(data.password);

        await User.updateOne({ _id: user._id }, { ...data });

        return res.status(200).json({ success: true, message: "User password updated" });
    } catch(error) {
        return outErrors(res, error);
    }
}

/**
 * Delete current user account
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteMe = async (req, res) => {
    const user = req.user;

    try {
        await User.deleteOne({ _id: user._id });

        return res.status(200).json({ success: true, message: "User account deleted" });
    } catch(error) {
        return outErrors(res, error);
    }
}


module.exports = {
    getMeInfo,
    getMeArticles,
    getMeArticleComments,
    updateMeInfo,
    updateMePassword,
    deleteMe,
}