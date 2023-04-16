import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";
import { SocialSchema } from "./social";
import { StoreSchema } from "./store";

const LayoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
      max: 50
    },
    emails: [String],
    phones: [String],
    socialMedia: {
      type: [SocialSchema],
    },
    stores: {
      type: [StoreSchema],
    },
    tabIcon: String,
    store_logo: {
      type: {
        uid: String,
        name: String,
        status: String,
        url: String,
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const LayoutModel = mongoose.model(TEXT_DEFINE.SCHEMA.layout, LayoutSchema);

export default LayoutModel;
