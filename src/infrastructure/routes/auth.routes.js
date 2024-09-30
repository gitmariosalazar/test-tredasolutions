import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { validateSignInSchema } from "../middlewares/validator.middlewares.js";
import { signInSchema } from "../../schemas/auth.schema.js";
import { logoutUser, verifyToken } from "../middlewares/authMiddleware.js";

const auth_router = Router();


auth_router.get('/auth/login/:email/:password', validateSignInSchema(signInSchema), login);
auth_router.get("/auth/logout", logoutUser);


export default auth_router;