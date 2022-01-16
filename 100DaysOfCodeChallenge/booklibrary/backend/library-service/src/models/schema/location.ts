import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret._id;
      },
    },
  }
);

export { locationSchema };
