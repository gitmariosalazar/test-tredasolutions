import { Router } from "express";
import { createReturnController, findReturnOne, updateStatus } from "../controllers/return.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const return_router = Router();


return_router.post('/returns/:order_item', verifyToken, createReturnController);
return_router.put("/returns/:return_id/:status", verifyToken, updateStatus);
return_router.get("/returns/:return_id", verifyToken,findReturnOne);


export default return_router;