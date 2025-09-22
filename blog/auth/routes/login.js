const express = require("express");
const app = express.Router();

const { loginUser } = require("../controllers/login");

/**
 * Login User
 * @path /auth/login
 * @method POST
 */
app.post("/", loginUser);

module.exports = app;