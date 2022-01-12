import { LocationDoc } from "./location-types";
import { Document, Model, Schema } from "mongoose";
import { UserDoc } from "./user-types";

export interface AuthHistoryDoc extends Document {
  requestId: string;
  user: UserDoc;
  touchPoint: string;
  lastSignin: Date;
  location: LocationDoc;
}

export interface authHistoryAttrs {
  requestId: string;
  user: UserDoc;
  touchPoint: string;
  lastSignin: Date;
  location: LocationDoc;
}

export interface AuthHistoryModel extends Model<AuthHistoryDoc> {
  build(attrs: authHistoryAttrs): AuthHistoryDoc;
}
