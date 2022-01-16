import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/exception/custom-error";
import { green, red } from "colors";
import { insertKpi } from "../service/kpi/kpi-service";
import { ServiceCallError } from "../models/exception/service-call-error";

export const errorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    console.error(
      red(`[AUTH SERVICE][GENERATE ERROR][${error.errorName.toUpperCase()}]`)
    );

    const { kpi, serviceName } = error;

    try {
      console.log(green(`[${serviceName}][INSERT KPI][START]`));
      await insertKpi(kpi, serviceName);
      console.log(
        green(`[${serviceName}][INSERT KPI][SUCCESSFULLY INSERT KPI]`)
      );
    } catch (error) {
      if (error instanceof ServiceCallError) {
        console.log(
          red(`[${serviceName}][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`)
        );
      }
    }

    return res.status(error.statusCode).send(error.generateErrors());
  }

  const serviceName = process.env.SERVICE_NAME;

  console.error(red(`[${serviceName}][GENERATE ERROR][UNEXPECTED ERROR]`));

  res.status(400).send({
    errors: [
      {
        message: "Unexpected Errors",
      },
    ],
  });
};
