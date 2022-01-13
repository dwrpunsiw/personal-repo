import { DatabaseInsertionError } from "./../../models/exception/database-insertion-error";
import { constructKpiPayload } from "./../../helpers/construct-payload";
import { insertKpi } from "./../../service/kpi/kpi-service";
import { GenericResponse } from "./../../models/response/generic-response";
import { Request, Response } from "express";
import { green, red } from "colors";
import { User } from "../../models/schema/user";
import { Completion } from "../../models/enums/completion";
import { ServiceCallError } from "../../models/exception/service-call-error";
import { ConflictDataError } from "../../models/exception/conflict-data-error";

export const checkUsername = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };
  const username = req.query.username as string;

  console.log(
    green(`[USER SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(green(`[USER SERVICE][CHECK USERNAME '${username}'][START]`));
  const existingUser = await User.findOne({ username: username.toLowerCase() });

  if (existingUser) {
    console.log(
      red(
        `[USER SERVICE][CHECK USERNAME '${username}'][USERNAME ALREADY EXISTS]`
      )
    );

    const newKpi = constructKpiPayload(
      requestId,
      touchPoint,
      req.path,
      req.method,
      Completion.Failed,
      `Username already exists`,
      {
        exceptionName: DatabaseInsertionError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "USERNAME ALREADY EXISTS",
        exceptionStatus: "Failed",
      }
    );

    try {
      console.log(green(`[USER SERVICE][INSERT KPI][START]`));
      await insertKpi(newKpi, "USER");
      console.log(green(`[USER SERVICE][INSERT KPI][SUCCESSFULLY INSERT KPI]`));
    } catch (error) {
      if (error instanceof ServiceCallError) {
        console.log(
          red(`[USER SERVICE][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`)
        );
        throw error;
      }
    }

    throw new ConflictDataError("Username already taken");
  }

  console.log(
    green(
      `[USER SERVICE][CHECK USERNAME '${username}'][USERNAME ARE AVAILABLE]`
    )
  );

  const newKpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    Completion.Success,
    `Successfully check username`
  );

  try {
    console.log(green(`[USER SERVICE][INSERT KPI][START]`));
    await insertKpi(newKpi, "USER");
    console.log(green(`[USER SERVICE][INSERT KPI][SUCCESSFULLY INSERT KPI]`));
  } catch (error) {
    if (error instanceof ServiceCallError) {
      console.log(red(`[USER SERVICE][INSERT KPI][UNSUCCESSFULLY INSERT KPI]`));
      throw error;
    }
  }

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Username are available"
  );

  res.status(response.code).json(response.generateResponse());
};
