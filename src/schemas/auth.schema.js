import { z } from "zod";
export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required!" }),

  password: z
    .string({ required_error: "Password is required!" })
    .min(1, { message: "Password is required!" })
});
