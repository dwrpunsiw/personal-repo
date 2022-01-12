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
import { ConflictDataError } from "../../models/exception/conflict-data-error";
import { userAttrs } from "../../models/schema/types/user-types";

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

    console.log(`KPI : ${newKpi}`);

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
    touchPoint,
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
