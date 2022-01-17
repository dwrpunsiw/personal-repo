import { GenericResponse } from "@wpw-library/common";
import { DatabaseInsertionError } from "@wpw-library/common";
import { Request, Response } from "express";
import { User } from "../../models/schema/user";
import { red, green } from "colors";
import { Completion } from "@wpw-library/common";
import { constructKpiPayload } from "@wpw-library/common";
import jwt from "jsonwebtoken";
import { ConflictDataError } from "@wpw-library/common";
import { userAttrs } from "../../models/schema/types/user-types";
import { onCompletion } from "@wpw-library/common";

export const signup = async (req: Request, res: Response) => {
  const { requestid: requestId, touchpoint: touchPoint } = req.headers as {
    requestid: string;
    touchpoint: string;
  };

  const {
    username,
    password,
    email,
    firstname,
    lastname,
    birthdate,
  }: userAttrs = req.body;

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

  console.log(green(`[AUTH SERVICE][GET USER][CHECKING EXISTING USER]`));
  const existingUser = await User.findOne({ username: username.toLowerCase() });

  if (existingUser) {
    console.log(red(`[AUTH SERVICE][GET USER][USER ALREADY EXISTS]`));

    kpi = {
      ...kpi,
      completion: Completion.Failed,
      description: `Unsuccessfully signing up a new user, user already exists`,
      exception: {
        exceptionName: ConflictDataError.prototype.errorName,
        exceptionCode: "01",
        exceptionDescription:
          "UNSUCCESSFULLY SIGN UP USER, USER WITH CORRESPONDING USERNAME ALREADY EXISTS",
        exceptionStatus: "Failed",
      },
    };
    throw new ConflictDataError(
      "Corresponding username not found",
      "AUTH SERVICE",
      kpi
    );
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

    throw new DatabaseInsertionError(user, "AUTH SERVICE", kpi);
  }

  const userJwt = jwt.sign(user.toJSON(), process.env.JWT_SECRET!);

  // Store it on session object
  req.session = {
    authlib: userJwt,
  };

  kpi = {
    ...kpi,
    completion: Completion.Success,
    description: `Successfully sign up a new user`,
  };

  await onCompletion("AUTH SERVICE", kpi);

  const response = new GenericResponse(
    Completion.Success,
    201,
    "Successfully sign up a new user",
    user.toJSON()
  );

  res.status(response.code).json(response.generateResponse());
};
