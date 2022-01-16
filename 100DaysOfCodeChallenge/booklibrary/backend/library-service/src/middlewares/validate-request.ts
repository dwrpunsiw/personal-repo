import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { constructKpiPayload } from "../helpers/construct-payload";
import { Completion } from "../models/enums/completion";
import { RequestValidationError } from "../models/exception/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  if (!errors.isEmpty()) {
    let serviceName = process.env.SERVICE_NAME as string;
    let kpi = constructKpiPayload(
      requestId,
      touchPoint,
      req.path,
      req.method,
      Completion.Failed,
      `Invalid request parameters`,
      {
        exceptionName: RequestValidationError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "INVALID REQUEST PARAMETERS",
        exceptionStatus: "Failed",
      }
    );

    throw new RequestValidationError(errors.array(), serviceName, kpi);
  }

  next();
};
