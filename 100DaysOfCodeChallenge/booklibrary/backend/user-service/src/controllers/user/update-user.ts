import { Request, Response } from "express";
import { green, red } from "colors";
import { User } from "../../models/schema/user";
import { Completion } from "../../models/enums/completion";
import { constructKpiPayload } from "../../helpers/construct-payload";
import { DatabaseInsertionError } from "../../models/exception/database-insertion-error";
import { insertKpi } from "../../service/kpi/kpi-service";
import { ServiceCallError } from "../../models/exception/service-call-error";
import { GenericResponse } from "../../models/response/generic-response";

export const updateUser = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };
  const { username, email, firstname, lastname, birthdate } = req.body;

  console.log(
    green(`[USER SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  let updatedUser;

  try {
    console.log(green(`[USER SERVICE][UPDATING USER][START]`));
    User.findOneAndUpdate(
      { username: username },
      {
        $set: { username, email, firstname, lastname, birthdate },
      },
      { omitUndefined: true, new: true },
      (error, doc) => {
        if (error) {
          throw error;
        }
        updatedUser = doc;
      }
    );
    console.log(
      green(`[USER SERVICE][UPDATING USER][SUCCESSFULLY UPDATING USER]`)
    );
  } catch (error) {
    console.log(
      red(`[USER SERVICE][UPDATING USER][UNSUCCESSFULLY UPDATING USER]`)
    );

    const newKpi = constructKpiPayload(
      requestId,
      touchPoint,
      req.path,
      req.method,
      Completion.Error,
      `Unsuccessfully signing up a new user`,
      {
        exceptionName: DatabaseInsertionError.prototype.errorName,
        exceptionCode: "99",
        exceptionDescription: "UNSUCCESSFULLY INSERT DOCUMENT TO MONGODB",
        exceptionStatus: "Error",
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

    throw new DatabaseInsertionError(req.body);
  }

  const newKpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    Completion.Success,
    `Successfully update user`
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
    201,
    "Successfully update user",
    updatedUser
  );

  res.status(response.code).json(response.generateResponse());
};
