import express from "express";
import cors from "cors";

const app = express();

app.use(cors());//dose nothing at the moment
app.use(express.json());//parses JSONs
app.use(express.urlencoded({extended:false}));//this is common practice for urlencoded

//routes

app.listen(8080,function(){
    console.log("listening to port 8080")
})