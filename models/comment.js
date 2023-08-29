import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    created_at: {type: Date},
    recipe_id: {type: mongoose.Schema.Types.ObjectId, ref: "Recipe"}
})

const User = mongoose.model("Comment", commentSchema)
export default User;