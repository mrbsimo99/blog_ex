const Joi = require("joi");
const { outErrors } = require("../../utils/errors");
const { User } = require("../../db");
const { comparePassword, generateUserToken } = require("../../utils/auth");

/**
 * Login user by credentials
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const loginUser = async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    try {
        // Stampa cosa arriva nel body
        console.log("REQ BODY:", req.body);

        // Validazione schema
        const data = await schema.validateAsync(req.body);
        console.log("VALIDATED DATA:", data);

        // Trova utente attivo e verificato con email esatta
        const user = await User.findOne({
            email: data.email,
            isActive: true,
            isVerified: true
        }).lean();

        console.log("FOUND USER:", user);

        if (!user) {
            console.log("Nessun utente trovato con questi dati.");
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        // Verifica password
        const isPasswordValid = await comparePassword(data.password, user.password);
        console.log("PASSWORD VALID:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Password errata.");
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        // Genera token
        const token = await generateUserToken({ _id: user._id, email: user.email, role: user.role });

        // Rimuove dati sensibili
        delete user.password;
        delete user.isVerified;
        delete user.isActive;
        delete user.emailVerifyToken;

        console.log("LOGIN SUCCESS, TOKEN GENERATED", token);
        return res.status(200).json({ success: true, data: { token, user } });

    } catch(error) {
        console.error("LOGIN ERROR:", error);
        return outErrors(res, error, 500, "Login Failed");
    }
}

module.exports = {
    loginUser,
};
