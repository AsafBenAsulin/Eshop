import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from './routes/userRouter.js'
import orderRouter from "./routes/orderRouter.js";

const app = express();
dotenv.config();

app.use(cors());//dose nothing at the moment
app.use(express.json());//parses JSONs
app.use(express.urlencoded({ extended: false }));//this is common practice for urlencoded

const PORT = process.env.PORT || 8080;
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

//routes
app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/orders", orderRouter);

app.use((err, req, res, next) =>{
    res.status(500).send({message: err.message});
});

mongoose.connect(CONNECTION_STRING).then(
    () => {
        app.listen(PORT, function () {
            console.log("listening to port " + PORT);
        })
    }).catch(err => { console.log(err.message); });


export default app;