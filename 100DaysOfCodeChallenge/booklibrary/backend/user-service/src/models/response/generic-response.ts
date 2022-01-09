import { Completion } from "../enums/completion";

export class GenericResponse {
  constructor(
    public status: Completion,
    public code: number,
    public message: string,
    public data?: any
  ) {}

  generateResponse(): {
    status: Completion;
    code: number;
    message: string;
    data?: any;
  } {
    return {
      status: this.status,
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
