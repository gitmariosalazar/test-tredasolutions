import { Router } from "express";
import { deleteProductByCode, getProductByCode, getProducts, postProduct, putProduct } from "../controllers/product.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateCreateProductSchema, validateUpdateProductSchema } from "../middlewares/validator.middlewares.js";
import { productCreateSchema, productUpdateSchema } from "../../schemas/product.schema.js";

const product_router = Router();


product_router.post('/products',verifyToken,validateCreateProductSchema(productCreateSchema), postProduct);
product_router.get('/products',verifyToken, getProducts);
product_router.get('/products/:code',verifyToken, getProductByCode);
product_router.put('/products/:code',verifyToken,validateUpdateProductSchema(productUpdateSchema), putProduct);
product_router.delete('/products/:code',verifyToken, deleteProductByCode);


export default product_router;