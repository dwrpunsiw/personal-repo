import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class DatabaseNotFoundError extends CustomError {
  statusCode: number = 404;
  errorName: string = "Database Not Found Error";

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseNotFoundError.prototype);
  }
  generateErrors(): {
    status: Completion;
    code: number;
    message: string;
    field?: any;
  } {
    return {
      status: Completion.Failed,
      code: this.statusCode,
      message: this.message,
    };
  }
}
