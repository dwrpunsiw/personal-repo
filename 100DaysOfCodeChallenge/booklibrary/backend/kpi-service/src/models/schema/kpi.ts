import mongoose from "mongoose";
import { KPIDoc, KPIModel, kpiAttrs } from "./types/kpi-types";
import { exceptionSchema } from "./exception";

const kpiSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
    },
    servicename: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    routes: {
      type: String,
      required: true,
    },
    touchPoint: {
      type: String,
      required: true,
    },
    operationType: {
      type: String,
      required: true,
    },
    completion: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    exception: {
      type: exceptionSchema,
      default: () => {
        return {
          exceptionName: "",
          exceptionDescription: "",
          exceptionCode: "",
          exceptionStatus: "",
        };
      },
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

kpiSchema.statics.build = (attrs: kpiAttrs) => {
  return new Kpi(attrs);
};

const Kpi = mongoose.model<KPIDoc, KPIModel>("Kpi", kpiSchema);

export { Kpi };
