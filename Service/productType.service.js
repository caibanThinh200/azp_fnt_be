import moment from "moment";
import randomstring from "randomstring";
import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import ProductTypeModel from "../Model/product-type";
import { getActionResult } from "../Util/function";
import { removeObjectEmptyValue } from "../Util/function"

class ProductTypeService {
    static async AddProductTypeService(req, res) {
        try {
            const data = req.body;
            const productTypeAdapter = {
                name: data?.name || "",
                code: randomstring.generate({
                    length: 10,
                    capitalization: "uppercase",
                    charset: "hex"
                }) || "",
                filter: data?.filter || {},
                attributes: data?.attributes || [],
                status: data?.status || 2,
                thumb: data?.thumb || {}
            }
            const productTypeModel = new ProductTypeModel(productTypeAdapter);
            await productTypeModel.save();
            return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT_TYPE.create);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.create);
        }
    }

    static async GetListProductTypeService(req, res) {
        try {
            const filterParams = req?.query,
                startIndex = ((filterParams?.page_index || 1) - 1) * (filterParams?.page_size || 10),
                endIndex = (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
            const resultAll = await ProductTypeModel.find();
            const resultList = await ProductTypeModel.find(filterParams).populate("attributes")
                .sort({ updated_at: "desc" })
            // .then(result => result.map(productType => ({
            //     ...productType._doc,
            //     created_at: moment(productType.created_at).format("DD-MM-YYYY hh:mm:ss"),
            //     updated_at: moment(productType.updated_at).format("DD-MM-YYYY hh:mm:ss")
            // })));
            const responseData = {
                total: resultAll.length,
                page_index: filterParams?.page_index,
                page_size: filterParams?.page_size,
                result: resultList.slice(startIndex, endIndex)
            }
            return {
                status: "SUCCESS",
                error: null,
                ...responseData
            }
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.getList);
        }
    }

    static async GetListAllProductTypeService(req, res) {
        try {
            const result = await ProductTypeModel.find().populate("attributes");
            return getActionResult(200, result);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.getList);
        }
    }

    static async GetDetailProductTypeService(req, res) {
        try {
            const id = req.params.id || "";
            const productTypeDetail = await ProductTypeModel.findById(id).populate("attributes");
            return getActionResult(200, productTypeDetail);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.getDetail);
        }
    }

    static async UpdateProductTypeService(req, res) {
        try {
            const currentProductType = await this.GetDetailProductTypeService(req);
            const newData = removeObjectEmptyValue({
                name: req.body?.name || "",
                attributes: req.body?.attributes || [],
                status: req.body?.status || 1,
                filter: req.body?.filter || {},
                thumb: req.body?.thumb || {}
            });
            const updateProductType = { ...currentProductType.result._doc, ...newData };
            await ProductTypeModel.findByIdAndUpdate(req.params?.id, updateProductType, { new: true })
            return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT_TYPE.update);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.update);
        }
    }
}

export default ProductTypeService;