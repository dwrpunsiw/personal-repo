import { Document, Model } from "mongoose";

export interface UserDoc extends Document {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname?: string;
  birthdate?: Date;
  isAdmin?: boolean;
  lastSignin?: Date;
}

export interface userAttrs {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname?: string;
  birthdate?: Date | string;
  isAdmin?: boolean;
  lastSignin?: Date;
}

export interface UserModel extends Model<UserDoc> {
  build(attrs: userAttrs): UserDoc;
}
