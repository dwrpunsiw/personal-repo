import { CoverDoc } from "./cover-types";
import { Document, Model } from "mongoose";
import { LocationDoc } from "./location-types";
import { UserDoc } from "./user-types";

export interface BookDoc extends Document {
  user: UserDoc;
  title: string;
  description: string;
  author: string;
  isbn: string;
  cover: CoverDoc;
  firstpublishyear: number;
  publisher: string;
  buydate: Date | string;
  location: LocationDoc;
}

export interface bookAttrs {
  user: UserDoc;
  title: string;
  description: string;
  author: string;
  isbn: string;
  cover: CoverDoc;
  firstpublishyear: number;
  publisher: string;
  buydate: Date | string;
  location: LocationDoc;
}

export interface BookModel extends Model<BookDoc> {
  build(attrs: bookAttrs): BookDoc;
}
