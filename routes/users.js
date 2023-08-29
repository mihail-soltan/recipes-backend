import { Router } from "express";
import { signUp, signin } from "../controllers/users.js";

const userRouter = Router()

userRouter.route("/signup")
    .post(signUp)

userRouter.route("/signin")
    .post(signin)

export default userRouter