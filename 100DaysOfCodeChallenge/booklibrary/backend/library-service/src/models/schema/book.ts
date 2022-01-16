import mongoose, { Schema } from "mongoose";
import { CoverSchema } from "./cover";
import { locationSchema } from "./location";
import { bookAttrs, BookDoc, BookModel } from "./types/book-types";

const BookSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    cover: {
      type: CoverSchema,
    },
    firstpublishyear: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    buydate: {
      type: Date,
      default: null,
    },
    location: {
      type: locationSchema,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

BookSchema.statics.build = (attrs: bookAttrs) => {
  return new Book(attrs);
};

const Book = mongoose.model<BookDoc, BookModel>("Book", BookSchema);

export { Book, BookSchema };
