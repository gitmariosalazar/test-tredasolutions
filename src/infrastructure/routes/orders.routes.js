import { Router } from "express";
import { createOrderController, getOrderOne, getOrders } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const order_router = Router();


order_router.post('/orders/:customer',verifyToken, createOrderController);
order_router.get('/orders',verifyToken, getOrders);
order_router.get("/orders/:order_id",verifyToken, getOrderOne);


export default order_router;