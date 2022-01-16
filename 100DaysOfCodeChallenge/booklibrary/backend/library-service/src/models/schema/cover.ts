import mongoose from "mongoose";

const CoverSchema = new mongoose.Schema({
  small: {
    type: String,
  },
  medium: {
    type: String,
  },
  large: {
    type: String,
  },
});

export { CoverSchema };
