import express from 'express';
import { createProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/",createProduct)
//productRouter.get("/",getProducts)

export default productRouter;