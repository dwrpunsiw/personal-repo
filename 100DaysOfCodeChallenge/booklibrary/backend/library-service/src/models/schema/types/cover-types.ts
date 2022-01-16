import { Document, Model } from "mongoose";

export interface CoverDoc extends Document {
  small: string;
  medium: string;
  large: string;
}

export interface coverAttrs {
  small: string;
  medium: string;
  large: string;
}

export interface CoverModel extends Model<CoverDoc> {
  build(attrs: coverAttrs): CoverDoc;
}
