import moment from "moment";
import randomstring from "randomstring";
import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import { UpdateCategory } from "../Middleware/product.middleware";
import ProductModel from "../Model/product";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";

class ProductService {
    static async AddProductService(req, res) {
        try {
            const data = req.body;
            const productAdapter = {
                name: data?.name || "",
                code: "AZP-" + randomstring.generate({
                    length: 4,
                    capitalization: "uppercase",
                    charset: "hex"
                }) || "",
                price: data?.price || 0,
                attribute: data?.attribute || {},
                shortDescription: data?.shortDescription || "",
                detailDescription: data?.detailDescription || "",
                mainThumbs: data?.mainThumb || [],
                subThumbs: data?.subThumb || [],
                discount_value: data?.discount_value || 0,
                product_type: data?.product_type || "",
                category: data?.category,
                status: 2
            }
            // console.log(productAdapter)
            const productModel = new ProductModel(productAdapter);
            await productModel.save();
            return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT.create);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.create);
        }
    }

    static async GetListProductService(req, res) {
        try {
            const filterParams = req?.query,
                startIndex = (filterParams?.page_index || 1 - 1) * (filterParams?.page_size || 10),
                endIndex = (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
            const resultAll = await ProductModel.find();
            const resultList = await ProductModel.find(filterParams)
                .sort({ updated_at: "desc" })
            // .then(result => result.map(product => ({
            //     ...product._doc,
            //     created_at: moment(product.created_at).format("DD-MM-YYYY hh:mm:ss"),
            //     updated_at: moment(product.updated_at).format("DD-MM-YYYY hh:mm:ss")
            // })));
            const responseData = {
                total: resultAll.length,
                page_index: filterParams?.page_index || 1,
                page_size: filterParams?.page_size || 10,
                result: resultList.slice(startIndex, endIndex)
            }
            return {
                status: "SUCCESS",
                ...responseData
            };
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getList);
        }
    }

    static async GetDetailProductService(req, res) {
        try {
            const id = req.params.id || "";
            const productDetail = await ProductModel.findById(id);
            return getActionResult(200, productDetail);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getDetail);
        }
    }

    static async UpdateProductService(req, res) {
        try {
            const currentProduct = await this.GetDetailProductService(req);
            const data = req.body;
            const newData = removeObjectEmptyValue({
                name: data?.name || "",
                price: data?.price || 0,
                attribute: data?.attribute || {},
                shortDescription: data?.shortDescription || "",
                detailDescription: data?.detailDescription || "",
                mainThumbs: data?.mainThumb || [],
                subThumbs: data?.subThumb || [],
                discount_value: data?.discount_value || 0,
                product_type: data?.product_type || "",
                category: data?.category || "",
                status: data?.status || 1
            });
            const updateProduct = { ...currentProduct.result._doc, ...newData };
            // await UpdateCategory(updateProduct);
            await ProductModel.findByIdAndUpdate(req.params?.id, updateProduct, { new: true });
            return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT.update);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.update);
        }
    }

    static async UpdatePriceService(req, res) {
        try {
            const { price, isPercent } = req.body;
            let newValue = 0;
            await (await ProductModel.find().snapshot()).map(doc => {
                if (isPercent) {
                    newValue = doc.price - price;
                } else {
                    newValue = (doc.price * price) / 100;
                }
                doc.price = newValue;
                ProductModel.save()
            });
            return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT.update);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.update);
        }
    }
}

export default ProductService;