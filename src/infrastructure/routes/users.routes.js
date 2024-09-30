import { Router } from "express";
import { deleteUserByEmail, getUserByEmail, getUsers, postUser, putUser } from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateRegisterUserSchema, validateUpdateUserSchema } from "../middlewares/validator.middlewares.js";
import { createUserSchema, updateUserSchema } from "../../schemas/user.schema.js";

const user_router = Router();


user_router.post('/users',validateRegisterUserSchema(createUserSchema) ,postUser);
user_router.get('/users', verifyToken, getUsers);
user_router.get('/users/:email', verifyToken, getUserByEmail);
user_router.put('/users/:email', verifyToken, validateUpdateUserSchema(updateUserSchema), putUser);

user_router.delete('/users/:email',verifyToken, deleteUserByEmail);


export default user_router;