import express from "express";
import { validateRequest } from "../middlewares/validate-request";

import { insertKpi, summaryKpi } from "../controllers/kpi-controller";
import { kpiValidations } from "../validations/kpi";

const router = express.Router();

router.post("/api/insertkpi", kpiValidations, validateRequest, insertKpi);
router.post("/api/summarykpi", summaryKpi);

export default router;
