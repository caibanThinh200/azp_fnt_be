import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

export const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true      
    },
    address: {
      type: String,
      required: true,
    },
    district: [String],
    city: [String],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const StoreModel = mongoose.model(TEXT_DEFINE.SCHEMA.store, StoreSchema);

export default StoreModel;
