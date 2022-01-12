import mongoose, { Schema } from "mongoose";
import {
  AuthHistoryDoc,
  AuthHistoryModel,
  authHistoryAttrs,
} from "./types/auth-history-types";

import { locationSchema } from "./location";

const authHistorySchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestId: {
      type: String,
      required: true,
    },
    touchPoint: {
      type: String,
      required: true,
    },
    lastSignin: {
      type: Date,
      required: true,
    },
    location: {
      type: locationSchema,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

authHistorySchema.statics.build = (attrs: authHistoryAttrs) => {
  return new AuthHistory(attrs);
};

const AuthHistory = mongoose.model<AuthHistoryDoc, AuthHistoryModel>(
  "AuthHistory",
  authHistorySchema
);

export { AuthHistory };
