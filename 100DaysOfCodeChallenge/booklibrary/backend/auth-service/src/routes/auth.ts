import { signinValidations, signupValidations } from "./../validations/auth";
import { validateRequest } from "./../middlewares/validate-request";

// Import Dependency
import express from "express";

// Import Module
import {
  signin,
  signout,
  signup,
  authenticate,
} from "../controllers/auth-controller";

const router = express.Router();

router.post("/api/auth/signup", signupValidations, validateRequest, signup);
router.post("/api/auth/signin", signinValidations, validateRequest, signin);
router.post("/api/auth/signout", signout);
router.post("/api/auth/authenticate", authenticate);

export default router;
