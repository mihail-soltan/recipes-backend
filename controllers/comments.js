import Comment from "../models/comment.js";
import jsonwebtoken from 'jsonwebtoken';

export async function postComment(request, response) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        response.status(401).json({ message: "Please log in to create a new comment" })
    }


    jsonwebtoken.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (err) {
            response.status(401).json({ message: err.message })
        }
        request.user = user
        // console.log(request.user)
        const comment = new Comment({ ...request.body, created_at: new Date(), user_id: request.user.id })
        const newRecipe = await comment.save()
        response.status(200).json(newRecipe)
    })

}