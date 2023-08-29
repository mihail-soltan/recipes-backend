import { Router } from "express";

import { postComment, getCommentsByRecipeId } from "../controllers/comments";

const commentRouter = Router();

commentRouter.route("/")
    .post(postComment)

commentRouter.route("/recipeId")
    .get(getCommentsByRecipeId)
