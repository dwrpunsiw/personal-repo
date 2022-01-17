import { Request, Response } from "express";
import { green, red } from "colors";
import { User } from "../../models/schema/user";
import {
  Completion,
  constructKpiPayload,
  DatabaseInsertionError,
  GenericResponse,
  onCompletion,
} from "@wpw-library/common";

export const updateUser = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  let kpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    null,
    null,
    null
  );

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

    kpi = {
      ...kpi,
      completion: Completion.Error,
      description: `Unsuccessfully signing up a new user`,
      exception: {
        exceptionName: DatabaseInsertionError.prototype.errorName,
        exceptionCode: "99",
        exceptionDescription: "UNSUCCESSFULLY UPDATE DOCUMENT TO MONGODB",
        exceptionStatus: "Error",
      },
    };

    throw new DatabaseInsertionError(req.body, "USER SERVICE", kpi);
  }

  kpi = {
    ...kpi,
    completion: Completion.Success,
    description: `Successfully update user`,
  };

  await onCompletion("USER SERVICE", kpi);

  const response = new GenericResponse(
    Completion.Success,
    201,
    "Successfully update user",
    updatedUser
  );

  res.status(response.code).json(response.generateResponse());
};
