import { body } from "express-validator";

export const kpiValidations = [
  body("requestId").notEmpty().withMessage("Request id must be provided"),
  body("servicename").notEmpty().withMessage("Service name must be provided"),
  body("version").notEmpty().withMessage("Version must be provided"),
  body("routes").notEmpty().withMessage("Routes must be provided"),
  body("touchPoint").notEmpty().withMessage("Request Id must not be empty"),
  body("operationType")
    .notEmpty()
    .withMessage("Operation type must be provided"),
  body("completion").notEmpty().withMessage("Completion must be provided"),
  body("description").notEmpty().withMessage("Description must be provided"),
];
