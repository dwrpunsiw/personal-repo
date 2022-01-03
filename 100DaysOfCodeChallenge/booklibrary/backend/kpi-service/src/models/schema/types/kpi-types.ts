import { Document, Model } from "mongoose";

export interface KPIDoc extends Document {
  servicename: string;
  routes: string;
  completion: string;
  description: string;
}

export interface kpiAttrs {
  servicename: string;
  routes: string;
  completion: string;
  description: string;
}

export interface KPIModel extends Model<KPIDoc> {
  build(attrs: kpiAttrs): KPIDoc;
}
