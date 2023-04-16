import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

const orderSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    contact: {
        type: {
            name: String,
            email: String,
            phone: String,
            address: String,
            note: String,
            province: String,
            district: String,
            ward: String
        }
    },
    orders: {
        type: [{
            product: {
                type: mongoose.Types.ObjectId,
                ref: TEXT_DEFINE.SCHEMA.product
            },
            quantity: Number
        }],
    },
    status: {
        type: Number,
        default: 1
    },
    cost: {
        type: {
            totalOrder: Number,
            VATCost: Number,
            ship: Number,
            totalCost: Number
        }
    },
    payment: {
        type: String,
        default: 1
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const OrderModel = mongoose.model(TEXT_DEFINE.SCHEMA.order, orderSchema);

export default OrderModel;