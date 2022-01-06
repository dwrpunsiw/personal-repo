import { Document, Model } from "mongoose";

export interface ExceptionDoc extends Document {
  exceptionName: string;
  exceptionDescription: string;
  exceptionCode: string;
  exceptionStatus: string;
}

export interface exceptionAttrs {
  exceptionName: string;
  exceptionDescription: string;
  exceptionCode: string;
  exceptionStatus: string;
}

export interface ExceptionModel extends Model<ExceptionDoc> {
  build(attrs: exceptionAttrs): ExceptionDoc;
}
