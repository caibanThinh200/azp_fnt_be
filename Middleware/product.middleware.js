import Logger from "../config/logger"
import TEXT_DEFINE from "../constant/textDefine"
import categoryModel from "../Model/category"
import ProductModel from "../Model/product";
import { checkSpicialCharacter, responseBadRequest } from "../Util/function";

export const AddCategory = async (document) => {
    await categoryModel.updateOne(
        { "_id": document.category },
        {
            "$addToSet": {
                "productTypes": document.product_type,
                "products": document._id
            }
        });
};

export const UpdateCategory = async (document) => {
    await categoryModel.find({
        products: document._id
    }).then(async categories => {
        categories.map(async category => {
            if (category._id.toString() !== document.category.toString()) {
                await categoryModel
                    .findById(category._id)
                    .updateMany({}, { $pull: { products: document.id } });
            }
        });
        return categoryModel.findById(document.category)
            .populate("productTypes")
            .populate("products");
    })
    await categoryModel.find({     
        productTypes: document.product_type
    })
        .populate("productTypes")
        .then(async categories => {
            categories.map(async category => {
                await (category.productTypes || []).map(async type => {
                    const products = await ProductModel.find({
                        category: category._id,
                        product_type: type._id
                    });
                    if (products.length < 1) {
                        await categoryModel
                            .findById(category._id)
                            .updateMany({}, { $pull: { productTypes: type._id } });
                    }
                });
            });
        });
    await categoryModel.findById(document.category).updateOne({ _id: document.category }, {
        $addToSet: { products: document._id, productTypes: document.product_type }
    });
}

export const ValidateProduct = async (req, res, next) => {
    try {
        const existingProduct = await ProductModel.findOne({ name: req.body?.name });
        const isValidExisting = !existingProduct;
        const isValidName =
            !!req.body?.name &&
            !!(!checkSpicialCharacter(req.body?.name));

        const isValidQuantity = req.body.quantity > 0;
        const isValidPrice = req.body.price > 0;
        const isValidMainThumb = (req.body.mainThumb || []).length > 0 && (req.body.mainThumb || []).length < 2;
        switch (false) {
            case isValidName: {
                responseBadRequest(TEXT_DEFINE.VALIDATION.PRODUCT.name, res)
                break;
            };
            case isValidQuantity: {
                responseBadRequest(TEXT_DEFINE.VALIDATION.PRODUCT.quantity, res);
                break;
            };
            case isValidPrice: {
                responseBadRequest(TEXT_DEFINE.VALIDATION.PRODUCT.price, res);
                break;
            };
            case isValidMainThumb: {
                responseBadRequest(TEXT_DEFINE.VALIDATION.PRODUCT.mainThumb, res);
                break;
            };
            case isValidExisting: {
                responseBadRequest(TEXT_DEFINE.VALIDATION.PRODUCT.existing, res);
                break;
            };
            default: next();
        }
    } catch (e) {
        return false;
    }
};