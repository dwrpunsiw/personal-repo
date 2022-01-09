import { ServiceCallError } from "./../models/exception/service-call-error";
import { insertKpi } from "./../service/kpi/kpi-service";
import { GenericResponse } from "./../models/response/generic-response";
import { DatabaseInsertionError } from "./../models/exception/database-insertion-error";
import { Request, Response } from "express";
import { User } from "../models/schema/user";
import { red, green } from "colors";
import { Completion } from "../models/enums/completion";
import { constructKpiPayload } from "../helpers/construct-payload";
import jwt from "jsonwebtoken";
import { DatabaseNotFoundError } from "../models/exception/database-not-found-error";
import { verifyHashedPassword } from "../helpers/encrypt";
import { InvalidCredentialsError } from "../models/exception/invalid-credentials-error";
import { VerifyTokenError } from "../models/exception/verify-token-error";
import { ConflictDataError } from "../models/exception/conflict-data-error";
import { userAttrs } from "../models/schema/types/user-types";

export const signup = async (req: Request, res: Response) => {
  const requestId = req.headers.requestid as string;

  const {
    username,
    password,
    email,
    firstname,
    lastname,
    birthdate,
  }: userAttrs = req.body;

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(green(`[AUTH SERVICE][GET USER][CHECKING EXISTING USER]`));
  const existingUser = await User.findOne({ username: username.toLowerCase() });

  if (existingUser) {
    console.log(red(`[AUTH SERVICE][GET USER][USER ALREADY EXISTS]`));
    throw new ConflictDataError("Corresponding username not found");
  }

  const newUser = {
    username: username.toLowerCase(),
    password,
    email,
    firstname: firstname.toLowerCase(),
    lastname: lastname?.toLowerCase(),
    birthdate,
  };

  const user = User.build(newUser);

  try {
    console.log(green(`[AUTH SERVICE][SAVING USER][START]`));
    await user.save();
    console.log(
      green(`[AUTH SERVICE][SAVING USER][SUCCESSFULLY SAVING NEW USER]`)
    );
  } catch (error) {
    console.log(red(`[AUTH SERVICE][SAVING USER][UNSUCCESSFULLY SAVING USER]`));

    const newKpi = constructKpiPayload(
      requestId,
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

    throw new DatabaseInsertionError(user);
  }

  const userJwt = jwt.sign(user.toJSON(), process.env.JWT_SECRET!);

  // Store it on session object
  req.session = {
    authlib: userJwt,
  };

  const newKpi = constructKpiPayload(
    requestId,
    req.path,
    req.method,
    Completion.Success,
    `Successfully sign up a new user`
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
    201,
    "Successfully sign up a new user",
    user.toJSON()
  );

  res.status(response.code).json(response.generateResponse());
};

export const signin = async (req: Request, res: Response) => {
  const requestId = req.headers.requestid as string;
  const { username, password } = req.body;

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
      insertKpi(newKpi);
    } catch (error) {
      if (error instanceof ServiceCallError) {
        throw error;
      }
    }
    throw new InvalidCredentialsError("Password are invalid");
  }
  console.log(
    green(`[AUTH SERVICE][VERIFY CREDENTIALS][CREDENTIALS VERIFIED]`)
  );

  console.log(green(`[AUTH SERVICE][GENERATE TOKEN][START]`));
  const userJwt = await jwt.sign(
    existingUser.toJSON(),
    process.env.JWT_SECRET!
  );

  req.session = {
    authlib: userJwt,
  };
  console.log(green(`[AUTH SERVICE][GENERATE TOKEN][SUCCESS]`));

  const newKpi = constructKpiPayload(
    requestId,
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
export const signout = async (req: Request, res: Response) => {
  const requestId = req.headers.requestid as string;

  console.log(
    green(`[AUTH SERVICE][REQUEST RECEIVED][REQUEST ID ${requestId}]`)
  );

  console.log(green(`[AUTH SERVICE][RESET SESSION][START]`));

  req.session = null;

  console.log(
    green(`[AUTH SERVICE][RESET SESSION][SUCCESSFULLY RESET SESSION]`)
  );

  const newKpi = constructKpiPayload(
    requestId,
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

  res.status(205).send({});
};
export const authenticate = async (req: Request, res: Response) => {
  const requestId = req.headers.requestid as string;

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
