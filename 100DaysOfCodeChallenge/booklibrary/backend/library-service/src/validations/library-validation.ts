import { header, body } from "express-validator";

export const bookValidations = [
  header("requestid")
    .notEmpty()
    .withMessage("Request Id must not be empty")
    .isUUID("4")
    .withMessage("Invalid request id"),
  header("touchpoint").notEmpty().withMessage("Request Id must not be empty"),
];
