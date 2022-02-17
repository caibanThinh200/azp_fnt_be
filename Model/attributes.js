import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

const attributeSchema = new mongoose.Schema({
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
    unit: String,
    status: {
        type: Number,
        default: 1
    },
    filter: {
        type: {
            option: Number,
        }
    },
    field: String,
    require: Boolean
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const AttributeModel = mongoose.model(TEXT_DEFINE.SCHEMA.attribute, attributeSchema);

export default AttributeModel;