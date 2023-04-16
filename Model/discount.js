import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";
import { UpdateActiveDiscount } from "../Middleware/discount.middleware";

const { Schema } = mongoose;
const discountSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    isPercent: Boolean,
    discount_value: {
        type: Number,
        min: [1, TEXT_DEFINE.VALIDATION.DISCOUNT.minPrice],
    },
    status: {
        type: Number,
        default: 0
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

discountSchema.post("findOneAndUpdate", doc => UpdateActiveDiscount(doc))

const discountModel = mongoose.model(TEXT_DEFINE.SCHEMA.discount, discountSchema);

export default discountModel;