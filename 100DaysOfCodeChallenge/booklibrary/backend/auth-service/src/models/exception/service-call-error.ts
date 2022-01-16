import { Kpi } from "../../service/kpi/types/kpi-types";
import { Completion } from "../enums/completion";
import { CustomError } from "./custom-error";

export class ServiceCallError extends CustomError {
  statusCode = 400;
  message: string;
  errorName: string = "Service Call Error";

  constructor(message: string, public serviceName: string, public kpi: Kpi) {
    super(`${message}`);
    this.message = `${message}`;
    Object.setPrototypeOf(this, ServiceCallError.prototype);
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
