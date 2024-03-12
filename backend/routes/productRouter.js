import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { productData, getProductById, getProductByToken, getCategories, getProductByQuery } from "../../controllers/productController.js";

const productRouter = express.Router();

productRouter.get('/', productData);
productRouter.get("/categories", expressAsyncHandler(getCategories));
productRouter.get("/search", expressAsyncHandler(getProductByQuery))
productRouter.get("/token/:token", expressAsyncHandler(getProductByToken));
productRouter.get("/:id", expressAsyncHandler(getProductById));


export default productRouter;