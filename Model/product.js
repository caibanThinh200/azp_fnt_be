import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";
import { UpdateCategory, AddCategory } from "../Middleware/product.middleware"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        default: 1
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount_price: {
        type: Number,
        default: 0
    },
    discount_value: {
        type: Number,
        default: 0
    },
    product_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TEXT_DEFINE.SCHEMA.product_type
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: TEXT_DEFINE.SCHEMA.category
    },
    attribute: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    isPercent: Boolean,
    shortDescription: String,
    detailDescription: String,
    mainThumbs: {
        type: [{
            uid: String,
            name: String,
            status: String,
            url: String
        }],
        max: 2
    },
    subThumbs: {
        type: [{
            uid: String,
            name: String,
            status: String,
            url: String
        }],
        max: 6
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

productSchema.index({code: 'text'});

productSchema.add({
    slug: String
})

productSchema.post("save", doc => AddCategory(doc));
productSchema.post("findOneAndUpdate", doc => UpdateCategory(doc));

const ProductModel = mongoose.model(TEXT_DEFINE.SCHEMA.product, productSchema);

export default ProductModel;