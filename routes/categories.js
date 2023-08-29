import { Router } from "express";
import { getCategories, postCategory, updateCategory, deleteCategory, getCategoryById } from "../controllers/categories.js";

const categoryRouter = Router()


categoryRouter.route("")
    .get(getCategories)
    .post(postCategory)

categoryRouter.route("/:id")
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory)

export default categoryRouter