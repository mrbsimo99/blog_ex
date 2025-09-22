const express = require("express");
const { getAllCategories, getCategoryById, createCategory, updateCategoryById, deleteCategoryById } = require("../controllers/categories");
const { authUser } = require("../../middleware/auth");
const app = express.Router();

// 1. GET /api/categories -> Ottenere tutti i commenti di un articolo impaginati
/**
 * Get all categories
 * @path /api/categories
 * @method GET
 */
app.get("/", getAllCategories);

// 2. GET /api/categories/:id -> Ottenere una singola categoria
/**
 * Get category by id
 * @path /api/categories/:id
 * @method GET
 */
app.get("/:id", getCategoryById);

// 3. POST /api/categories -> Creare una nuova categoria
/**
 * Create category
 * @path /api/categories
 * @method POST
 */
app.post("/", authUser(["author"]), createCategory);

// 4. PUT /api/categories/:id -> Modificare una categoria tramite ID
/**
 * Update category by id
 * @path /api/categories/:id
 * @method PUT
 */
app.put("/:id", authUser(["author"]), updateCategoryById);

// 5. DELETE /api/categories/:id -> Eliminare una categoria tramite ID
/**
 * Delete category by id
 * @path /api/categories/:id
 * @method DELETE
 */
app.delete("/:id", authUser(["author"]), deleteCategoryById);

module.exports = app;