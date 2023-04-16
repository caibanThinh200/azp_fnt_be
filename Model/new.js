import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

const NewSchema = new mongoose.Schema(
  {
    type: {
      type: Number,
      default: 0,
    },
    code: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TEXT_DEFINE.SCHEMA.new,
    },
    status: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
    thumb: {
      type: {
        uid: String,
        name: String,
        status: String,
        url: String,
      },
    },
    favorite: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const NewModel = mongoose.model(TEXT_DEFINE.SCHEMA.new, NewSchema);

export default NewModel;
