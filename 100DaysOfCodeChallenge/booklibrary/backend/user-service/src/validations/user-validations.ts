import { header, body, query } from "express-validator";

export const userValidations = [
  header("requestid")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Request Id not valid"),
  header("touchpoint").notEmpty().withMessage("Request Id must not be empty"),
  body("username").notEmpty().withMessage("Username must not be empty"),
  body("email")
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email is not valid"),
  body("firstname").notEmpty().withMessage("First name must not be empty"),
  body("birthdate").optional().isDate().withMessage("Invalid Date format"),
];

export const checkUsernameValidations = [
  header("requestid")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Request Id not valid"),
  header("touchpoint").notEmpty().withMessage("Request Id must not be empty"),
  query("username").notEmpty().withMessage("Username must not be empty"),
];
