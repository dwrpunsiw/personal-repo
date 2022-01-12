import { header, body } from "express-validator";

export const signupValidations = [
  header("requestid")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
  header("touchpoint").notEmpty().withMessage("Request Id must not be empty"),
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
  header("requestid")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
  header("touchpoint").notEmpty().withMessage("Request Id must not be empty"),
  body("username").notEmpty().withMessage("Please provide username"),
  body("password")
    .notEmpty()
    .withMessage("Please provide password")
    .isLength({ min: 5 })
    .withMessage("Password min. 5 characters"),
  body("location").notEmpty().withMessage("Location must not be empty"),
  body("location.lat")
    .notEmpty()
    .withMessage("Latitude must not be empty")
    .trim()
    .isNumeric()
    .withMessage("Latitude must be numeric format"),
  body("location.lng")
    .notEmpty()
    .withMessage("Longitude must not be empty")
    .trim()
    .isNumeric()
    .withMessage("Latitude must be numeric format"),
];

export const signoutValidations = [
  header("requestid")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
  header("touchpoint").notEmpty().withMessage("Request Id must not be empty"),
];
