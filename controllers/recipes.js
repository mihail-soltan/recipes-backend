import Recipe from "../models/recipe.js";
import jsonwebtoken from 'jsonwebtoken';
// CRUD ops

//GET

export async function getRecipes(request, response) {
    try {
        const recipes = await Recipe.find().populate("category")
        response.status(200).json(recipes);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getRecipesByCategory(request, response) {
    try {
        const categoryId = request.params.category
        const recipes = await Recipe.find({ category: { $in: [categoryId] } }).populate("category")
        response.status(200).json(recipes)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export async function getRecipeById(request, response) {
    try {
        const recipes = await Recipe.findById(request.params.id);
        response.status(200).json(recipes);
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//POST 
export async function postRecipe(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new recipe" })
    }


    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            response.status(401).json({ message: err.message })
        }
        request.user = user
        // console.log(request.user)
        const recipe = new Recipe({ ...request.body, created_at: new Date(), created_by: request.user.id, status: "pending" })
        const newRecipe = await recipe.save()
        response.status(200).json(newRecipe)
    })

}

// for authenticated users who want to see recipes creaeted by them
export const getRecipesByUserId = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Please log in to create a new recipe" })
    }

    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(401).json({ message: err.message })
        }
        req.user = user
        const recipes = Recipe.find({ created_by: req.user.id })
        res.status(200).json(recipes)
    })
}

// for authenticated users who want to see recipes assigned to them

export const getRecipesByResponsibleUser = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Please log in to create a new recipe" })
    }

    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            res.status(401).json({ message: err.message })
        }
        req.user = user
        const recipes = Recipe.find({ responsible_user: req.user.id })
        res.status(200).json(recipes)
    })
}

//PUT
export async function updateRecipe(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new recipe" })
    }

    try {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                response.status(401).json({ message: err.message })
            }
            request.user = user
            const updatedRecipe = await Recipe.findByIdAndUpdate(request.params.id,
                { ...request.body, updated_at: new Date(), updated_by: request.user.id, edited: true },
                { new: true })

            response.json(updatedRecipe)
        })
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

//DELETE
export async function deleteRecipe(request, response) {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(request.params.id)
        response.json(deletedRecipe)
    }
    catch (err) {
        response.status(500).json({ message: err.message })
    }
}

export const rateRecipe = async (req, res) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        response.status(401).json({ message: "Please log in to rate a recipe" })
    }

    try {
        const recipeId = req.params.id

        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw new Error("Recipe not found");
        }
        jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                response.status(401).json({ message: err.message })
            }
            request.user = user
            const updatedRecipe = await Recipe.findByIdAndUpdate(request.params.id,
                { ...request.body, updated_at: new Date(), updated_by: request.user.id, rating: (recipe.rating * recipe.rated_by.length + rating) / (recipe.rated_by.length + 1) },
                { new: true })

            response.json(updatedRecipe)
        })
        // Update rating and rated_by
        recipe.rating = (recipe.rating * recipe.rated_by.length + rating) / (recipe.rated_by.length + 1);
        recipe.rated_by.push(userId);

        await recipe.save();

        return recipe;
    } catch (error) {
        throw error;
    }
};
