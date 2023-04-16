import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import ProductTypeService from "../Service/productType.service";
import { getActionResult } from "../Util/function";

class ProductTypeController {
    static async AddProductTypeController(req, res) {
        try {
            const result = await ProductTypeService.AddProductTypeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.create);
        }
    }

    static async GetListProductTypeController(req, res) {
        try {
            const result = await ProductTypeService.GetListProductTypeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.getList);
        }
    }

    static async GetListAllProductTypeController(req, res) {
        try {
            const result = await ProductTypeService.GetListAllProductTypeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.getList);
        }
    }

    static async GetDetailProductTypeController(req, res) {
        try {
            const result = await ProductTypeService.GetDetailProductTypeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.getDetail);
        }
    }

    static async UpdateProductTypeController(req, res) {
        try {
            const result = await ProductTypeService.UpdateProductTypeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.update);
        }
    }
}

export default ProductTypeController;