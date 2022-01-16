import { Document, Model } from "mongoose";

export interface LocationDoc extends Document {
  lat: string;
  lng: string;
}

export interface locationAttrs {
  lat: string;
  lng: string;
}

export interface LocationModel extends Model<LocationDoc> {
  build(attrs: locationAttrs): LocationDoc;
}
