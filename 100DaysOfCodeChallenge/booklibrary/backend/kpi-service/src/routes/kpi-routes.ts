import express from "express";
import { validateRequest } from "../middlewares/validate-request";

import { insertKpi } from "../controllers/kpi-controller";
import { kpiValidations } from "../validations/kpi";

const router = express.Router();

router.post("/api/insertkpi", kpiValidations, validateRequest, insertKpi);

export default router;
