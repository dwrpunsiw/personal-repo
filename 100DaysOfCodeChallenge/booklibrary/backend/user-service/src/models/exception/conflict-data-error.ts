import { Kpi } from "../../service/kpi/types/kpi-types";
import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class ConflictDataError extends CustomError {
  statusCode: number = 409;
  errorName: string = "Conflict Data Error";

  constructor(
    public message: string,
    public serviceName: string,
    public kpi: Kpi
  ) {
    super(message);
    Object.setPrototypeOf(this, ConflictDataError.prototype);
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
