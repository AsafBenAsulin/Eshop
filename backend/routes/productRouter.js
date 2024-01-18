import express from "express";
import productData from "../controllers/productController.js";

const productRouter = express.Router();
productRouter.get('/', productData);

export default productRouter;