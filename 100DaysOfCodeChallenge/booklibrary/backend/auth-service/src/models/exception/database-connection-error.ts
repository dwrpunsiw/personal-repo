import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  errorName = "Database Connection Error";
  statusCode = 500;
  reason = "Failed to connect to a database";

  constructor() {
    super("Failed to connect to a database");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  generateErrors(): {
    status: Completion;
    code: number;
    message: string;
  } {
    return {
      status: Completion.Error,
      code: this.statusCode,
      message: this.reason,
    };
  }
}
