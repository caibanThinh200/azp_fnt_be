import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

export const SocialSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "gmail",
    },
    info_url: {
        type: String,
        required: true
    },
    logo: {
        type: String, 
        // required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const SocialModel = mongoose.model(TEXT_DEFINE.SCHEMA.social, SocialSchema);

export default SocialModel;
