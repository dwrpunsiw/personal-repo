import { validateRequest } from "./../middlewares/validate-request";
import express from "express";
import { checkUsername, updateUser } from "../controllers/user-controller";
import {
  checkUsernameValidations,
  userValidations,
} from "../validations/user-validations";

const router = express.Router();

router.get(
  "/api/user/checkusername",
  checkUsernameValidations,
  validateRequest,
  checkUsername
);

router.post(
  "/api/user/update-profile",
  userValidations,
  validateRequest,
  updateUser
);

export default router;
