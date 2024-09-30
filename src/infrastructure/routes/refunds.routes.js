import { Router } from "express";
import { createRefundController, findReturnOne, updateStatus } from "../controllers/refund.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const refund_router = Router();


refund_router.post("/refunds/:return_id",verifyToken, createRefundController);
refund_router.put("/refunds/:return_id/:status",verifyToken, updateStatus);
refund_router.get("/refunds/:refund_id",verifyToken, findReturnOne);


export default refund_router;