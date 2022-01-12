import { LocationDoc } from "./../../models/schema/types/location-types";
import { ServiceCallError } from "./../../models/exception/service-call-error";
import { insertKpi } from "./../../service/kpi/kpi-service";
import { GenericResponse } from "./../../models/response/generic-response";
import { DatabaseInsertionError } from "./../../models/exception/database-insertion-error";
import { Request, Response } from "express";
import { User } from "../../models/schema/user";
import { red, green } from "colors";
import { Completion } from "../../models/enums/completion";
import { constructKpiPayload } from "../../helpers/construct-payload";
import jwt from "jsonwebtoken";
import { DatabaseNotFoundError } from "../../models/exception/database-not-found-error";
import { verifyHashedPassword } from "../../helpers/encrypt";
import { InvalidCredentialsError } from "../../models/exception/invalid-credentials-error";
import { AuthHistory } from "../../models/schema/auth-history";

export const signin = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };
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
    throw new DatabaseNotFoundError(
      "User with corresponding username not found"
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
    const newKpi = constructKpiPayload(
      requestId,
      touchPoint,
      req.path,
      req.method,
      Completion.Failed,
      `Unsuccessfully signing in user, password are not match`,
      {
        exceptionName: InvalidCredentialsError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription: "PASSWORD NOT MATCH, INVALID CREDENTIALS",
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
    throw new InvalidCredentialsError("Password are invalid");
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
    await existingUser.update({ $set: { lastSignin: lastSignin } });
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

    throw new DatabaseInsertionError(existingUser);
  }

  console.log(green(`[AUTH SERVICE][GENERATE TOKEN][START]`));
  const userJwt = jwt.sign(existingUser.toJSON(), process.env.JWT_SECRET!);

  req.session = {
    authlib: userJwt,
  };
  console.log(green(`[AUTH SERVICE][GENERATE TOKEN][SUCCESS]`));

  const newKpi = constructKpiPayload(
    requestId,
    touchPoint,
    req.path,
    req.method,
    Completion.Success,
    `Successfully sign up a new user`
  );

  try {
    insertKpi(newKpi);
  } catch (error) {
    if (error instanceof ServiceCallError) {
      throw error;
    }
  }

  const response = new GenericResponse(
    Completion.Success,
    200,
    "Successfully sign in a new user",
    existingUser.toJSON()
  );

  res.status(response.code).send(response);
};
