import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import recipeRouter from './routes/recipes.js';
import categoryRouter from './routes/categories.js';
import userRouter from './routes/users.js';
// const express = require('express') for type: "commonjs" in package.json 
dotenv.config()
const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;

app.use("/recipes", recipeRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter)
app.use("/", (request, response) => {
    response.json({
        message: "HELLO JUPITER!",
        status: 200
    })
})


async function connectToDB() {
    try {
        await mongoose.connect(process.env.CONNECTION_URI);
    }
    catch (err) {
        console.log(err)
    }
}

connectToDB().then((err) => {
    if (err) {
        console.log(err);
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
})