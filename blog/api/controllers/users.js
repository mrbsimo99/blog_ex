const Joi = require("joi");
const { hashPassword } = require("../../utils/auth");
const { User } = require("../../db");
const { outErrors } = require("../../utils/errors");


/**
 * Register a new User
 * @param {Request} req 
 * @param {Response} res 
 */
const registerNewUser = async (req, res) => {
    const role = req.query.role || "user";

    const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().valid("user", "author").default("user"),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.role = role;

        // Generare l'hash della password
        data.password = await hashPassword(data.password);

        // Registriamo l'utente nel db
        const user = (await new User(data).save()).toObject();

        // Eliminiamo dati sensibili per la sicurezza
        delete user.emailVerifyToken;

        return res.status(201).json({ success: true, message: `New ${role} registered`, data: { user } });
    } catch(error) {
        return outErrors(res, error);
    }
}

module.exports = {
    registerNewUser,
}