import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  message: string;
  errorName: string = "Not Found Error";

  constructor(route: string) {
    super(`Can't access ${route}, corresponding route is not found`);
    this.message = `Can't access ${route}, corresponding route is not found`;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  generateErrors(): {
    status: Completion;
    code: number;
    message: string;
    field?: string | undefined;
  } {
    return {
      status: Completion.Error,
      code: this.statusCode,
      message: this.message,
    };
  }
}
