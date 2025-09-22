const express = require("express");
const app = express.Router();

const { getMeInfo, updateMeInfo, updateMePassword, deleteMe, getMeArticleComments, getMeArticles } = require("../controllers/me");
const { authUser } = require("../../middleware/auth");

/**
 * Get current user information
 * @path /api/me
 * @method GET
 */
app.get("/", authUser(["user", "author"]), getMeInfo);

/**
 * Get current user articles
 * @path /api/me/articles
 * @method GET
 */
app.get("/articles", authUser(["author"]), getMeArticles);

/**
 * Get current user article comments
 * @path /api/me/articles/:article_id/comments
 * @method GET
 */
app.get("/:article_id/comments", authUser(["author"]), getMeArticleComments);

/***
 * Update current user information
 * @path /api/me
 * @method PUT
 */
app.put("/", authUser(["user", "author"]), updateMeInfo);

/**
 * Update current user password
 * @path /api/me/password
 * @method PUT
 */
app.put("/password", authUser(["user", "author"]), updateMePassword);

/**
 * Delete current user account
 * @path /api/me
 * @method DELETE
 */
app.delete("/", authUser(["user", "author"]), deleteMe);

module.exports = app;