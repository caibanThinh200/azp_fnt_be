import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

const { Schema } = mongoose;
const categorySchema = new mongoose.Schema({
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
    productTypes: {
        type: [Schema.Types.ObjectId],
        ref: TEXT_DEFINE.SCHEMA.product_type
    },
    status: {
        type: Number,
        default: 1
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: TEXT_DEFINE.SCHEMA.product
    },
    thumb: {
        type: {
            uid: String,
            name: String,
            status: String,
            url: String
        }
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const categoryModel = mongoose.model(TEXT_DEFINE.SCHEMA.category, categorySchema);

export default categoryModel;