const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { Tag } = require("../../db");

/**
 * Get all tags
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllTags = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const tags = await Tag.paginate({}, { lean: true, page, limit, sort });

        return res.status(200).json({ success: true, data: tags });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Get tag by id
 * @param {Request} req 
 * @param {Response} res 
 */
const getTagById = async (req, res) => {
    const _id = req.params.id;

    try {
        const tag = await Tag.findOne({ _id }, { lean: true });

        return res.status(200).json({ success: true, data: tag });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Create new tag
 * @param {Request} req 
 * @param {Response} res 
 */
const createTag = async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const tag = (await new Tag(data).save()).toObject();

        return res.status(200).json({ success: true, data: tag });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Update tag by id
 * @param {Request} req 
 * @param {Response} res 
 */
const updateTagById = async (req, res) => {
    const _id = req.params.id;
    const schema = Joi.object().keys({
        name: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Tag.updateOne({ _id }, data);

        return res.status(200).json({ success: true, message: "Tag updated" });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Update tag by id
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteTagById = async (req, res) => {
    const _id = req.params.id;

    try {
        await Tag.deleteOne({ _id });

        return res.status(200).json({ success: true, message: "Tag deleted" });
    } catch(error) {
        return outErrors(res, error)
    }
}

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTagById,
    deleteTagById
}