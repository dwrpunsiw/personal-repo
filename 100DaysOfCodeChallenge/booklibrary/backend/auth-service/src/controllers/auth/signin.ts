import { LocationDoc } from "./../../models/schema/types/location-types";
import { GenericResponse } from "@wpw-library/common";
import { DatabaseInsertionError } from "@wpw-library/common";
import { Request, Response } from "express";
import { User } from "../../models/schema/user";
import { red, green } from "colors";
import { Completion } from "@wpw-library/common";
import { constructKpiPayload } from "@wpw-library/common";
import jwt from "jsonwebtoken";
import { DatabaseNotFoundError } from "@wpw-library/common";
import { verifyHashedPassword } from "@wpw-library/common";
import { InvalidCredentialsError } from "@wpw-library/common";
import { AuthHistory } from "../../models/schema/auth-history";
import { onCompletion } from "@wpw-library/common";

export const signin = async (req: Request, res: Response) => {
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

  const { username, password } = req.body;
  const location: LocationDoc = req.body.location as LocationDoc;

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(green(`[AUTH SERVICE][GET USER][START]`));
  const existingUser = await User.findOne({ username: username });

  if (!existingUser) {
    console.log(
      red(
        `[AUTH SERVICE][GET USER][USER WITH CORRESPONDING USERNAME NOT FOUND]`
      )
    );

    kpi = {
      ...kpi,
      completion: Completion.Failed,
      description: `Unsuccessfully getting user, user not found`,
      exception: {
        exceptionName: DatabaseNotFoundError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "USER WITH CORRESPONDING USERNAME NOT FOUND",
        exceptionStatus: "Failed",
      },
    };
    throw new DatabaseNotFoundError(
      "User with corresponding username not found",
      "AUTH SERVICE",
      kpi
    );
  }

  console.log(green(`[AUTH SERVICE][VERIFY CREDENTIALS][START]`));
  let match = verifyHashedPassword(password, existingUser.password);

  if (!match) {
    console.log(
      red(
        `[AUTH SERVICE][VERIFY CREDENTIALS][USER WITH CORRESPONDING CREDENTIALS IS NOT VALID]`
      )
    );

    kpi = {
      ...kpi,
      completion: Completion.Failed,
      description: `Unsuccessfully signing in user, password are not match`,
      exception: {
        exceptionName: InvalidCredentialsError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "PASSWORD NOT MATCH, INVALID CREDENTIALS",
        exceptionStatus: "Failed",
      },
    };

    throw new InvalidCredentialsError(
      "Password are invalid",
      "AUTH SERVICE",
      kpi
    );
  }
  console.log(
    green(`[AUTH SERVICE][VERIFY CREDENTIALS][CREDENTIALS VERIFIED]`)
  );

  try {
    console.log(
      green(`[AUTH SERVICE][SAVING SIGNIN DATE AND INSERT HISTORY][START]`)
    );
    const lastSignin = new Date();
    const authHistoryAttrs = {
      user: existingUser,
      requestId,
      touchPoint,
      lastSignin,
      location,
    };
    const authHistory = AuthHistory.build(authHistoryAttrs);
    await authHistory.save();
    await existingUser.updateOne({ $set: { lastSignin: lastSignin } });
    console.log(
      green(
        `[AUTH SERVICE][SAVING SIGNIN DATE AND INSERT HISTORY][SUCCESSFULLY SIGNIN USER]`
      )
    );
  } catch (error) {
    console.log(
      red(
        `[AUTH SERVICE][SAVING SIGNIN DATE AND INSERT HISTORY][UNSUCCESSFULLY SAVING USER]`
      )
    );

    kpi = {
      ...kpi,
      completion: Completion.Error,
      description: `Unsuccessfully signing up a new user`,
      exception: {
        exceptionName: DatabaseInsertionError.prototype.errorName,
        exceptionCode: "99",
        exceptionDescription: "UNSUCCESSFULLY INSERT DOCUMENT TO MONGODB",
        exceptionStatus: "Error",
      },
    };

    throw new DatabaseInsertionError(existingUser, "AUTH SERVICE", kpi);
  }

  console.log(green(`[AUTH SERVICE][GENERATE TOKEN][START]`));
  const userJwt = jwt.sign(existingUser.toJSON(), process.env.JWT_SECRET!);

  req.session = {
    authlib: userJwt,
  };
  console.log(green(`[AUTH SERVICE][GENERATE TOKEN][SUCCESS]`));

  kpi = {
    ...kpi,
    completion: Completion.Success,
    description: `Successfully sign in a new user`,
  };

  await onCompletion("AUTH SERVICE", kpi);

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Successfully sign in a new user",
    existingUser.toJSON()
  );

  res.status(response.code).send(response);
};
