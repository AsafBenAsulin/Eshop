import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.use(cors());//dose nothing at the moment
app.use(express.json());//parses JSONs
app.use(express.urlencoded({ extended: false }));//this is common practice for urlencoded

const PORT = process.env.PORT || 8080
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING

mongoose.connect(CONNECTION_STRING).then(
    () => {
        app.listen(PORT, function () {
            console.log("listening to port " + PORT);
        })
    }).catch(err => { console.log(err.message); });
