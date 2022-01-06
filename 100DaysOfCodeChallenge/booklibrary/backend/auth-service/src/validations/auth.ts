import { body } from "express-validator";

export const signupValidations = [
  body("username").notEmpty().withMessage("Please provide username"),
  body("password")
    .notEmpty()
    .withMessage("Please provide password")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 characters"),
  body("email")
    .notEmpty()
    .withMessage("Please provide email")
    .isEmail()
    .withMessage("Please provide an valid email address"),
  body("firstname")
    .notEmpty()
    .withMessage("Please provide firstname")
    .isLength({ min: 4 })
    .withMessage("Password min. 5 characters"),
];
