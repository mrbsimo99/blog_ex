const express = require("express");
const app = express.Router();

const { registerNewUser } = require("../controllers/users");

/**
 * Register a new User
 * @path /api/users
 * @method POST
 */
app.post("/", registerNewUser);

module.exports = app;