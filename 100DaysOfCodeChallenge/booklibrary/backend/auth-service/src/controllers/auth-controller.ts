import { GenericResponse } from "./../models/response/generic-response";
import { DatabaseInsertionError } from "./../models/exception/database-insertion-error";
import { Request, Response } from "express";
import { User } from "../models/schema/user";
import { red, green } from "colors";
import { Completion } from "../models/enums/completion";

export const signup = async (req: Request, res: Response) => {
  const { username, password, email, firstname, lastname, birthdate } =
    req.body;

  const newUser = {
    username,
    password,
    email,
    firstname,
    lastname,
    birthdate,
  };

  const user = User.build(newUser);

  try {
    await user.save();
  } catch (error) {
    red(
      `[AUTH SERVICE][INSERT DOCUMENT][UNSUCCESSFULLY INSERT DOCUMENT TO MONGODB]`
    );
    throw new DatabaseInsertionError(user);
  }

  console.log(
    green(
      `[AUTH SERVICE][INSERT DOCUMENT][SUCCESSFULLY INSERT DOCUMENT TO MONGODB]`
    )
  );

  const response = new GenericResponse(
    Completion.Success,
    201,
    "Successfully insert document",
    user.toJSON()
  );

  res.status(response.code).json(response.generateResponse());
};
export const signin = async (req: Request, res: Response) => {};
export const signout = async (req: Request, res: Response) => {};
export const authenticate = async (req: Request, res: Response) => {};
