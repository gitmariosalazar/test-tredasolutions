import { z } from "zod";

export const productCreateSchema = z.object({
  code: z
    .string({ required_error: "Product code is required!" })
    .trim()
    .min(1, { message: "Product code is required!" })
    .max(20, { message: "Product code must be less than 20 characters" }),

  name: z
    .string({ required_error: "Product name is required!" })
    .trim()
    .min(1, { message: "Product name is required!" })
    .max(100, { message: "Product name must be less than 100 characters" }),

  description: z
    .string({ required_error: "Description is required!" })
    .trim()
    .min(1, { message: "Description is required!" })
    .max(500, { message: "Description must be less than 500 characters" }),

  price: z
    .number({
      required_error: "Price is required!",
      invalid_type_error: "Price must be a number",
    })
    .positive({ message: "Price must be a positive number" }),

  stock: z
    .number({
      required_error: "Stock is required!",
      invalid_type_error: "Stock must be a number",
    })
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock cannot be negative" }),
});


export const productUpdateSchema = z.object({
  name: z
    .string({ required_error: "Product name is required!" })
    .trim()
    .min(1, { message: "Product name is required!" })
    .max(100, { message: "Product name must be less than 100 characters" }),

  description: z
    .string({ required_error: "Description is required!" })
    .trim()
    .min(1, { message: "Description is required!" })
    .max(500, { message: "Description must be less than 500 characters" }),

  price: z
    .number({
      required_error: "Price is required!",
      invalid_type_error: "Price must be a number",
    })
    .positive({ message: "Price must be a positive number" }),

  stock: z
    .number({
      required_error: "Stock is required!",
      invalid_type_error: "Stock must be a number",
    })
    .int({ message: "Stock must be an integer" })
    .nonnegative({ message: "Stock cannot be negative" }),
});
