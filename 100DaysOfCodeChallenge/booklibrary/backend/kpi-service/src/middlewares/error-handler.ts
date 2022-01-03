import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/exception/custom-error";
import { red } from "colors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    console.error(
      red(`[AUTH SERVICE][GENERATE ERROR][${error.errorName.toUpperCase()}]`)
    );
    return res.status(error.statusCode).send(error.generateErrors());
  }

  console.error(`[AUTH SERVICE][GENERATE ERROR][UNEXPECTED ERROR]`);

  res.status(400).send({
    errors: [
      {
        message: "Unexpected Errors",
      },
    ],
  });
};
