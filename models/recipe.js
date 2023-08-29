import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    ingredients: [{type: String, required: true}],
    steps: [{type: String, required: true}],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    rating: {type: Number, default: 0},
    rated_by: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    created_at: { type: Date },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updated_at: { type: Date },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    edited: { type: Boolean },
})

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe