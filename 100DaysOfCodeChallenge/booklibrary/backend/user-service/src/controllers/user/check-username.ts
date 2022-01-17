import {
  constructKpiPayload,
  GenericResponse,
  Completion,
  ConflictDataError,
  onCompletion,
} from "@wpw-library/common";
import { Request, Response } from "express";
import { green, red } from "colors";
import { User } from "../../models/schema/user";

export const checkUsername = async (req: Request, res: Response) => {
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

    kpi = {
      ...kpi,
      completion: Completion.Failed,
      description: `Username already exists`,
      exception: {
        exceptionName: ConflictDataError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "USERNAME ALREADY EXISTS",
        exceptionStatus: "Failed",
      },
    };

    throw new ConflictDataError("Username already taken", "USER SERVICE", kpi);
  }

  console.log(
    green(
      `[USER SERVICE][CHECK USERNAME '${username}'][USERNAME ARE AVAILABLE]`
    )
  );

  kpi = {
    ...kpi,
    completion: Completion.Success,
    description: `Successfully check username`,
  };

  await onCompletion("USER SERVICE", kpi);

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Username are available"
  );

  res.status(response.code).json(response.generateResponse());
};
