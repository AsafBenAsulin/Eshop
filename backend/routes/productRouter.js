import express from "express";
import expressAsyncHandler from 'express-async-handler';
import {productData,getProductById,getProductByToken} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', productData);
productRouter.get("/:id",expressAsyncHandler(getProductById));
productRouter.get("/token/:token",expressAsyncHandler(getProductByToken));

export default productRouter;