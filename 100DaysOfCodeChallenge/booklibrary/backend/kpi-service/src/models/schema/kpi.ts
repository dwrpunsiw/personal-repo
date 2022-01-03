import mongoose from "mongoose";

import { KPIDoc, KPIModel, kpiAttrs } from "./types/kpi-types";

const kpiSchema = new mongoose.Schema(
  {
    servicename: {
      type: String,
      required: true,
    },
    routes: {
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
