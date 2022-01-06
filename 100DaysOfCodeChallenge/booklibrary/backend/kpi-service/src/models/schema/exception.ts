import mongoose from "mongoose";

import {
  ExceptionDoc,
  ExceptionModel,
  exceptionAttrs,
} from "./types/exception-types";

const exceptionSchema = new mongoose.Schema(
  {
    exceptionName: {
      type: String,
    },
    exceptionDescription: {
      type: String,
    },
    exceptionCode: {
      type: String,
    },
    exceptionStatus: {
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);

export { exceptionSchema };
