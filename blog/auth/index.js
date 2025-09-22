const express = require("express");
const app = express.Router();

/**
 * @path /auth/login
 */
app.use("/login", require("./routes/login"));

module.exports = app;