import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    created_at: { type: Date },
    created_by: { type: mongoose.Schema.Types.Mixed },
    updated_at: { type: Date },
    updated_by: { type: mongoose.Schema.Types.Mixed },
    edited: { type: Boolean }
})

const Category = mongoose.model("Category", categorySchema);
export default Category