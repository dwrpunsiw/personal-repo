import { validateRequest } from "./../middlewares/validate-request";
import express from "express";
import { checkUsername } from "../controllers/user-controller";
import { checkUsernameValidations } from "../validations/user-validations";

const router = express.Router();

router.get(
  "/api/user/checkusername",
  checkUsernameValidations,
  validateRequest,
  checkUsername
);

export default router;
