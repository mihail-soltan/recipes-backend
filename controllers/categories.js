import Category from "../models/category.js";

// CRUD ops

//GET

export async function getCategories(request, response) {
    try {
        const tasks = await Category.find();
        response.status(200).json(tasks);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}
export async function getCategoryById(request, response) {
    try {
        const tasks = await Category.findById(request.params.id);
        response.status(200).json(tasks);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}


//POST 
export async function postCategory(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new task" })
    }
    try {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                response.status(401).json({ message: err.message })
            }
            request.user = user
            const category = new Category({ ...request.body, created_at: new Date(), created_by: request.user.id })
            const newCategory = await category.save()
            response.status(200).json(newCategory)
        })
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}


//PUT
export async function updateCategory(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new task" })
    }
    try {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
            request.user = user
            const updatedCategory = await Category.findByIdAndUpdate(request.params.id,
                { ...request.body, updated_at: new Date(), edited: true, updated_by: request.user.id },
                { new: true })
            response.json(updatedCategory)
        })
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//DELETE
export async function deleteCategory(request, response) {
    try {
        const deletedCategory = await Category.findByIdAndDelete(request.params.id)
        response.json(deletedCategory)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}