import TEXT_DEFINE from "../constant/textDefine";
import ProductService from "../Service/product.service";
import { getActionResult } from "../Util/function";

class ProductController {
    static async AddProductController(req, res) {
        try {
            const result = await ProductService.AddProductService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.create);
        }
    }

    static async GetListProductController(req, res) {
        try {
            const result = await ProductService.GetListProductService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getList);
        }
    }

    static async GetDetailProductController(req, res) {
        try {
            const result = await ProductService.GetDetailProductService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getDetail);
        }
    }

    static async GetDetailProductByNameController(req, res) {
        try {
            const result = await ProductService.GetDetailProductByNameService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getDetail);
        }
    }

    static async UpdateProductController(req, res) {
        try {
            const result = await ProductService.UpdateProductService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.update);
        }
    }

    static async UpdatePriceController(req, res) {
        try {
            const result = await ProductService.UpdatePriceService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.update);
        }
    }
}

export default ProductController;