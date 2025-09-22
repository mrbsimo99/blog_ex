const express = require("express");
const { getAllTags, getTagById, createTag, updateTagById, deleteTagById } = require("../controllers/tags");
const { authUser } = require("../../middleware/auth");
const app = express.Router();

// 1. GET /api/tags -> Ottenere tutti i commenti di un articolo impaginati
/**
 * Get all tags
 * @path /api/tags
 * @method GET
 */
app.get("/", getAllTags);

// 2. GET /api/tags/:id -> Ottenere una singola categoria
/**
 * Get tag by id
 * @path /api/tags/:id
 * @method GET
 */
app.get("/:id", getTagById);

// 3. POST /api/tags -> Creare una nuova categoria
/**
 * Create tag
 * @path /api/tags
 * @method POST
 */
app.post("/", authUser(["author"]), createTag);

// 4. PUT /api/tags/:id -> Modificare una categoria tramite ID
/**
 * Update tag by id
 * @path /api/tags/:id
 * @method PUT
 */
app.put("/:id", authUser(["author"]), updateTagById);

// 5. DELETE /api/tags/:id -> Eliminare una categoria tramite ID
/**
 * Delete tag by id
 * @path /api/tags/:id
 * @method DELETE
 */
app.delete("/:id", authUser(["author"]), deleteTagById);

module.exports = app;