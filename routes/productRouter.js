import expres from 'express';
import { createProduct } from '../controllers/productController.js';

const productRouter = expres.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProducts)
