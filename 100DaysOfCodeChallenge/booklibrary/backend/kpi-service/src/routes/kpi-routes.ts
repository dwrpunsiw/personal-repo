import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Kpi } from "../models/schema/kpi";
import { green, red } from "colors";
import { DatabaseInsertionError } from "../models/exception/database-insertion-error";
import { GenericResponse } from "../models/response/generic-response";
import { Completion } from "../models/enums/completion";

const router = express.Router();

router.post(
  "/api/insertkpi",
  [
    body("servicename").notEmpty().withMessage("Service name must be provided"),
    body("routes").notEmpty().withMessage("Routes must be provided"),
    body("completion").notEmpty().withMessage("Completion must be provided"),
    body("description").notEmpty().withMessage("Description must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { servicename, routes, completion, description } = req.body;

    const newKpi = { servicename, routes, completion, description };

    const kpi = Kpi.build(newKpi);

    try {
      await kpi.save();
    } catch (error) {
      red(
        `[KPI SERVICE][INSERT DOCUMENT][UNSUCCESSFULLY INSERT DOCUMENT TO MONGODB]`
      );
      throw new DatabaseInsertionError(kpi);
    }

    console.log(
      green(
        `[KPI SERVICE][INSERT DOCUMENT][SUCCESSFULLY INSERT DOCUMENT TO MONGODB]`
      )
    );

    const response = new GenericResponse(
      Completion.Success,
      201,
      "Successfully insert document",
      kpi.toJSON()
    );

    res.status(response.code).json(response.generateResponse());
  }
);

export default router;
