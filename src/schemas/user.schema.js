import { z } from "zod";
export const createUserSchema = z.object({
  email: z
    .string({required_error: "Email is required!"})
    .trim()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required!" }),

  password: z
    .string({ required_error: "Password is required!" })
    .min(1, { message: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character (@$!%*?&)",
    })
    .trim(),

  firstname: z
    .string({ required_error: "First Name is required!" })
    .trim()
    .min(1, { message: "First Name is required!" })
    .max(50, { message: "First Name must be less than 50 characters" }),

  lastname: z
    .string({ required_error: "Last Name is required!" })
    .trim()
    .min(1, { message: "Last Name is required!" })
    .max(50, { message: "Last Name must be less than 50 characters" }),

  user_type: z
    .number({
      required_error: "User type is required",
      invalid_type_error: "User type must be a number",
    })
    .int(),
});

export const updateUserSchema = z.object({
  password: z
    .string({ required_error: "Password is required!" })
    .min(1, { message: "Password is required!" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&]/, {
      message: "Password must contain at least one special character (@$!%*?&)",
    })
    .trim(),

  firstname: z
    .string({ required_error: "First Name is required!" })
    .trim()
    .min(1, { message: "First Name is required!" })
    .max(50, { message: "First Name must be less than 50 characters" }),

  lastname: z
    .string({ required_error: "Last Name is required!" })
    .trim()
    .min(1, { message: "Last Name is required!" })
    .max(50, { message: "Last Name must be less than 50 characters" }),

  user_type: z
    .number({
      required_error: "User type is required",
      invalid_type_error: "User type must be a number",
    })
    .int(),
});
