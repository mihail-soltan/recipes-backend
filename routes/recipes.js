import { Router } from "express";
import { getRecipes, getRecipeById, postRecipe, updateRecipe, deleteRecipe, getRecipesByCategory, rateRecipe } from "../controllers/recipes.js";

const recipeRouter = Router();

recipeRouter.route("/")
    .get(getRecipes)
    .post(postRecipe)

recipeRouter.route("/:id")
    .get(getRecipeById)
    .put(updateRecipe)
    .delete(deleteRecipe)
recipeRouter.route("/rate/:id")
    .put(rateRecipe)
recipeRouter.route("/category/:category")
    .get(getRecipesByCategory)

export default recipeRouter