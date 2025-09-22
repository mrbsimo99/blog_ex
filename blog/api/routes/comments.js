const express = require("express");
const { getAllCommentsByArticleId, createArticleComment, updateCommentById, deleteCommentById } = require("../controllers/comments");
const { authUser } = require("../../middleware/auth");
const app = express.Router();

/**
 * Get all article's comments
 * @path /api/comments/:article_id
 * @method GET
 */
app.get("/:article_id", getAllCommentsByArticleId);

/**
 * Create new comment
 * @path /api/comments/:article_id
 * @method POST
 */
app.post("/:article_id", authUser(["user", "author"]), createArticleComment);

/**
 * Update comment by id
 * @path /api/comments/:id
 * @method PUT
 */
app.put("/:id", authUser(["user", "author"]), updateCommentById);

/**
 * Delete comment by id
 * @path /api/comments/:id
 * @method DELETE
 */
app.delete("/:id", authUser(["user", "author"]), deleteCommentById);

module.exports = app;