import { Type } from "typescript";
import { Kpi } from "../../service/kpi/types/kpi-types";
import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class DatabaseInsertionError extends CustomError {
  statusCode = 400;
  errorName = "Database Insertion Error";
  message = "Unable to insert document into database";

  constructor(
    public payload: any,
    public serviceName: string,
    public kpi: Kpi
  ) {
    super("Unable to insert document into database");
    Object.setPrototypeOf(this, DatabaseInsertionError.prototype);
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
      field: this.payload,
    };
  }
}
