import { header, body } from "express-validator";

export const signupValidations = [
  header("requestId")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
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

export const signinValidations = [
  header("requestId")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
  body("username").notEmpty().withMessage("Please provide username"),
  body("password")
    .notEmpty()
    .withMessage("Please provide password")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 characters"),
];

export const signoutValidations = [
  header("requestId")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
];
