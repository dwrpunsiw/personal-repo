import { VerifyTokenError } from "@wpw-library/common";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { constructKpiPayload } from "@wpw-library/common";
import { green, red } from "colors";
import { Completion } from "@wpw-library/common";

export const addbook = async (req: Request, res: Response) => {
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
  let user;

  const {
    title,
    description,
    author,
    isbn,
    cover,
    firstpublishyear,
    publisher,
    buydate,
    location,
  } = req.body;

  console.log(
    green(`[LIBRARY SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  try {
    console.log(green(`[LIBRARY SERVICE][AUTHENTICATE][START]`));
    user = await jwt.verify(req.session?.authlib, process.env.JWT_SECRET!);
    console.log(
      green(`[LIBRARY SERVICE][AUTHENTICATE][USER AUTHENTICATED, TOKEN VALID]`)
    );
  } catch (error) {
    console.log(red(`[LIBRARY SERVICE][AUTHENTICATE][TOKEN NOT VALID]`));

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

  res.send({});
};
