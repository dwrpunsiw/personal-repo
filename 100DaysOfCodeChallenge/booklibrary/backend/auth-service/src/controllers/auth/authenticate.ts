import { GenericResponse } from "@wpw-library/common";
import { Request, Response } from "express";
import { red, green } from "colors";
import { Completion } from "@wpw-library/common";
import { constructKpiPayload } from "@wpw-library/common";
import jwt from "jsonwebtoken";
import { VerifyTokenError } from "@wpw-library/common";
import { onCompletion } from "@wpw-library/common";

export const authenticate = async (req: Request, res: Response) => {
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

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  try {
    console.log(green(`[AUTH SERVICE][AUTHENTICATE][START]`));
    const payload = await jwt.verify(
      req.session?.authlib,
      process.env.JWT_SECRET!
    );
    console.log(
      green(`[AUTH SERVICE][AUTHENTICATE][USER AUTHENTICATED, TOKEN VALID]`)
    );
  } catch (error) {
    console.log(red(`[AUTH SERVICE][AUTHENTICATE][TOKEN NOT VALID]`));

    kpi = {
      ...kpi,
      completion: Completion.Failed,
      description: `Could not verify client token`,
      exception: {
        exceptionName: VerifyTokenError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "COULD NOT VERIFY CLIENT TOKEN",
        exceptionStatus: "Failed",
      },
    };

    throw new VerifyTokenError(
      "Could not authorize user, invalid credentials",
      "AUTH SERVICE",
      kpi
    );
  }

  kpi = {
    ...kpi,
    completion: Completion.Success,
    description: `Successfully authenticate user`,
  };

  await onCompletion("AUTH SERVICE", kpi);

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Successfully authenticate user"
  );

  res.status(response.code).send(response);
};
