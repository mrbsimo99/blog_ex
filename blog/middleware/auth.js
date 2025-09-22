const { User } = require("../db");
const { AuthError } = require("../errors");
const { verifyUserToken } = require("../utils/auth");
const { outErrors } = require("../utils/errors")

/**
 * Check user authorization status
 * @param {string[]} roles `user` or `author`
 * @returns {NextFunction|Promise<Error>}
 */
const authUser = (roles = ["user"]) => async (req, res, next) => {
    try {
        const bearer = req.headers.authorization || req.headers["Authorization"] || req.query.token || false;

        if (!bearer) throw new AuthError("Not Authorized");

        const token = req.query.token && !req.headers.authorization && !req.headers["Authorization"]  ? bearer : bearer.split(" ")[1];

        if (!token) throw new AuthError("Not Authorized");

        const payload = await verifyUserToken(token);

        const user = await User.findOne({ _id: payload._id, email: payload.email, role: payload.role, isActive: true, isVerified: true }, "-password -isActive -isVerified -emailVerifyToken", { lean: true });

        if (!user) throw new AuthError("Not Authorized");

        if (!roles.includes(user.role)) throw new AuthError("Not Authorized");

        req.user = user;
        req.token = token;

        return next();
    } catch(error) {
        return outErrors(res, error, error.code, error.message);
    }
}

module.exports = {
    authUser,
}