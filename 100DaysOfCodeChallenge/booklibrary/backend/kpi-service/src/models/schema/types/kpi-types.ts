import { ExceptionDoc } from "./exception-types";
import { Document, Model } from "mongoose";

export interface KPIDoc extends Document {
  requestId: string;
  servicename: string;
  version: string;
  routes: string;
  operationType: string;
  completion: string;
  description: string;
  exception?: ExceptionDoc;
}

export interface kpiAttrs {
  requestId: string;
  servicename: string;
  version: string;
  routes: string;
  operationType: string;
  completion: string;
  description: string;
  exception?: ExceptionDoc;
}

export interface KPIModel extends Model<KPIDoc> {
  build(attrs: kpiAttrs): KPIDoc;
}
