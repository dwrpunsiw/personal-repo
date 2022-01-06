import { Request, Response } from "express";

import { Kpi } from "../models/schema/kpi";
import { green, red } from "colors";
import { DatabaseInsertionError } from "../models/exception/database-insertion-error";
import { GenericResponse } from "../models/response/generic-response";
import { Completion } from "../models/enums/completion";

export const insertKpi = async (req: Request, res: Response) => {
  const {
    requestId,
    servicename,
    version,
    routes,
    operationType,
    completion,
    description,
    exception,
  } = req.body;

  const newKpi = {
    requestId,
    servicename,
    version,
    routes,
    operationType,
    completion,
    description,
    exception,
  };

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
};
