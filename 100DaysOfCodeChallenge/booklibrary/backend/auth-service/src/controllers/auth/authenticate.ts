import { ServiceCallError } from "./../../models/exception/service-call-error";
import { insertKpi } from "./../../service/kpi/kpi-service";
import { GenericResponse } from "./../../models/response/generic-response";
import { Request, Response } from "express";
import { red, green } from "colors";
import { Completion } from "../../models/enums/completion";
import { constructKpiPayload } from "../../helpers/construct-payload";
import jwt from "jsonwebtoken";
import { VerifyTokenError } from "../../models/exception/verify-token-error";

export const authenticate = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  try {
    console.log(green(`[AUTH SERVICE][AUTHENTICATE][START]`));
    const payload = jwt.verify(req.session?.authlib, process.env.JWT_SECRET!);
  } catch (error) {
    console.log(red(`[AUTH SERVICE][AUTHENTICATE][TOKEN NOT VALID]`));
    const newKpi = constructKpiPayload(
      requestId,
      touchPoint,
      req.path,
      req.method,
      Completion.Failed,
      `Could not verify client token`,
      {
        exceptionName: VerifyTokenError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "COULD NOT VERIFY CLIENT TOKEN",
        exceptionStatus: "Failed",
      }
    );

    try {
      console.log(green(`[AUTH SERVICE][INSERT KPI][START]`));
      insertKpi(newKpi);
      console.log(green(`[AUTH SERVICE][INSERT KPI][SUCCESSFULLY INSERT KPI]`));
    } catch (error) {
      if (error instanceof ServiceCallError) {
        console.log(
          red(`[AUTH SERVICE][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`)
        );
        throw error;
      }
    }
    throw new VerifyTokenError("Could not authorize user, invalid credentials");
  }

  const newKpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    Completion.Success,
    `Successfully sign out user`
  );

  try {
    console.log(green(`[AUTH SERVICE][INSERT KPI][START]`));
    insertKpi(newKpi);
    console.log(green(`[AUTH SERVICE][INSERT KPI][SUCCESSFULLY INSERT KPI]`));
  } catch (error) {
    if (error instanceof ServiceCallError) {
      console.log(red(`[AUTH SERVICE][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`));
      throw error;
    }
  }

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Successfully authenticate user"
  );

  res.status(response.code).send(response);
};
