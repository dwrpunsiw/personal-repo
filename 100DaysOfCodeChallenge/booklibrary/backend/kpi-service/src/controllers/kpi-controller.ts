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

  console.log(
    green(`[KPI SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

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
    console.log(green(`[KPI SERVICE][SAVING KPI][START]`));
    await kpi.save();
    console.log(green(`[KPI SERVICE][SAVING KPI][SUCCESSFULLY SAVE KPI]`));
  } catch (error) {
    red(`[KPI SERVICE][SAVING KPI][UNSUCCESSFULLY SAVING KPI]`);
    throw new DatabaseInsertionError(kpi);
  }

  const response = new GenericResponse(
    Completion.Success,
    201,
    "Successfully insert document",
    kpi.toJSON()
  );

  res.status(response.code).json(response.generateResponse());
};
