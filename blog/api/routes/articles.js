const express = require("express");
const { getAllArticles, getArticleById, createArticle, updateArticleById, deleteArticleById } = require("../controllers/articles");
const { authUser } = require("../../middleware/auth");
const app = express.Router();

/**
 * Get all articles
 * @path /api/articles
 * @method GET
 */
app.get("/", getAllArticles);

/**
 * Get article by ID
 * @path /api/articles/:id
 * @method GET
 */
app.get("/:id", getArticleById);

/**
 * Create new article
 * @path /api/articles
 * @method POST
 */
app.post("/", authUser(["author"]), createArticle);

/**
 * Update article by ID
 * @path /api/articles/:id
 * @method PUT
 */
app.put("/:id", authUser(["author"]), updateArticleById);

/**
 * Delete article by ID
 * @path /api/articles/:id
 * @method DELETE
 */
app.delete("/:id", authUser(["author"]), deleteArticleById);

module.exports = app;