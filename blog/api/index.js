const express = require("express");
const app = express.Router();

const { authUser } = require("../middleware/auth");

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"));

/**
 * @path /api/me
 */
app.use("/me", require("./routes/me"));

/**
 * @path /api/articles
 */
app.use("/articles", require("./routes/articles"));

/**
 * @path /api/comments
 */
app.use("/comments", require("./routes/comments"));

/**
 * @path /api/categories
 */
app.use("/categories", require("./routes/categories"));

/**
 * @path /api/tags
 */
app.use("/tags", require("./routes/tags"));

module.exports = app;