import User from "../models/user.js";
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import Recipe from "../models/recipe.js";

export const signUp = async (req, res) => {
    // 1. Check if email and password are there
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, error: "Some fields are missing", status: 400 }) // 400 - bad request
        return;
    }
    try {
        // 2. Check if user already exists
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            res.json({ success: false, error: "This user already exists", status: 400 })
            return;
        }
        const newUser = new User({ username: req.body.username, email: req.body.email, role: req.body.role, password: bcryptjs.hashSync(req.body.password, 10) }) // encrypting password so that the hashed password is saved in the DATABASE
        await newUser.save() // saving user to database
        const token = jsonwebtoken.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.SECRET_KEY)  // return token with some user data
        res.json({ success: true, token: token, status: 200 })
    }
    catch (err) {
        res.json({ success: false, message: err.message, status: 500 })
    }
}

export const signin = async (req, res) => {
    // 1. Check if email and password are there
    if (!req.body.email || !req.body.password) {
        res.json({ success: false, error: "Some fields are missing", status: 400 }) // 400 - bad request
        return;
    }
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.json({ success: false, error: "This user doesn't exist.", status: 400 })
            return;
        }
        else {
            if (!bcryptjs.compareSync(req.body.password, user.password)) {
                res.json({ success: false, error: "Wrong password", status: 401 })
                return;
            } else {
                const token = jsonwebtoken.sign({ id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY)
                res.json({ success: true, token: token, status: 200 })
            }
        }
    }
    catch (err) {
        res.json({ success: false, message: err.message, status: 500 })
    }
}


// export const assignRecipe = async (req, res) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         response.status(401).json({ message: "Please log in to create a new recipe" })
//     }
//     try {
//         jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
//             if (err) {
//                 response.status(401).json({ message: err.message })
//             }
//             req.user = user;
//             if (req.user.role !== "user") {
//                 res.status(401).json({ message: "You are not authorized to assign a recipe, mortal" })
//             }
//             const assignedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, { updated_at: new Date(), updated_by: req.user.id, responsible_user: req.params.userId })
//             res.status(201).json({ success: true, message: `Recipe ${assignedRecipe._id} assigned successfully to user ${assignedRecipe.responsible_user}. Congrats` })
//         })

//     }
//     catch (err) {
//         res.json({ success: false, message: err.message, status: 500 })
//     }
// }