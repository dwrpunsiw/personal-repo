import { Request, Response } from "express";

import { green } from "colors";
import { Kpi } from "../../models/schema/kpi";
import { GenericResponse, Completion } from "@wpw-library/common";

export const summaryKpi = async (req: Request, res: Response) => {
  const { requestId, servicename } = req.body;

  console.log(
    green(`[KPI SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(
    green(`[KPI SERVICE][GET ${servicename} SUMMARY][EXEC QUERY][START]`)
  );

  const summary = await Kpi.aggregate([
    {
      $match: { servicename: servicename },
    },
    {
      $group: {
        _id: "$completion",
        count: { $sum: 1 },
      },
    },
  ]).exec();

  console.log(
    green(`[KPI SERVICE][GET ${servicename} SUMMARY][EXEC QUERY][SUCCESS]`)
  );

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Successfully get summary",
    summary
  );

  res.status(response.code).send(response.generateResponse());
};
