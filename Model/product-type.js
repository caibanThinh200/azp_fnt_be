import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

const productTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    thumb: {
        type: {
            uid: String,
            name: String,
            status: String,
            url: String
        }
    },
    status: {
        type: Number,
        default: 1
    },
    filter: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    attributes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: TEXT_DEFINE.SCHEMA.attribute
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const productTypeModel = mongoose.model(TEXT_DEFINE.SCHEMA.product_type, productTypeSchema);

export default productTypeModel;