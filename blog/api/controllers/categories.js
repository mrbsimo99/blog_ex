const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { Category } = require("../../db");

/**
 * Get all categories
 * @param {Request} req 
 * @param {Response} res 
 */
const getAllCategories = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 12;
    const sort = req.query.sort || null;

    try {
        const categories = await Category.paginate({}, { lean: true, page, limit, sort });

        return res.status(200).json({ success: true, data: categories });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Get category by id
 * @param {Request} req 
 * @param {Response} res 
 */
const getCategoryById = async (req, res) => {
    const _id = req.params.id;

    try {
        const category = await Category.findOne({ _id }, { lean: true });

        return res.status(200).json({ success: true, data: category });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Create new category
 * @param {Request} req 
 * @param {Response} res 
 */
const createCategory = async (req, res) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const category = (await new Category(data).save()).toObject();

        return res.status(200).json({ success: true, data: category });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Update category by id
 * @param {Request} req 
 * @param {Response} res 
 */
const updateCategoryById = async (req, res) => {
    const _id = req.params.id;
    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Category.updateOne({ _id }, data);

        return res.status(200).json({ success: true, message: "Category updated" });
    } catch(error) {
        return outErrors(res, error)
    }
}

/**
 * Update category by id
 * @param {Request} req 
 * @param {Response} res 
 */
const deleteCategoryById = async (req, res) => {
    const _id = req.params.id;

    try {
        await Category.deleteOne({ _id });

        return res.status(200).json({ success: true, message: "Category deleted" });
    } catch(error) {
        return outErrors(res, error)
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategoryById,
    deleteCategoryById
}