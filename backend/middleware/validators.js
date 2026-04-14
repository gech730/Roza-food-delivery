import { body } from "express-validator";

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const orderInitValidator = [
  body("amount").isNumeric().withMessage("Amount must be a number").custom(v => v > 0).withMessage("Amount must be positive"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("first_name").trim().notEmpty().withMessage("First name is required"),
  body("last_name").trim().notEmpty().withMessage("Last name is required"),
  body("items").isArray({ min: 1 }).withMessage("Order must have at least one item"),
];

export const foodValidator = [
  body("name").trim().notEmpty().withMessage("Food name is required"),
  body("price").isNumeric().withMessage("Price must be a number").custom(v => v > 0).withMessage("Price must be positive"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];
