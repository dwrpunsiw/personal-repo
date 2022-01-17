import express from "express";
import { addbook } from "../controllers/library-contoller";
import { validateRequest } from "@wpw-library/common";
import { bookValidations } from "../validations/library-validation";

const router = express.Router();

router.post("/api/library/book", bookValidations, validateRequest, addbook);

export default router;
