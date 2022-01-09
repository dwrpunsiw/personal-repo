import { ValidationError } from "express-validator";
import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  errorName = "Request Validation Error";
  message = "Invalid request parameters";

  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  generateErrors() {
    return {
      status: Completion.Error,
      code: this.statusCode,
      message: this.message,
      field: this.errors.map((error) => {
        return { field: error.param, message: error.msg };
      }),
    };
  }
}
