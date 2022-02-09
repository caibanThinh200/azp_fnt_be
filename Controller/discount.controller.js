import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import DiscountService from "../Service/discount.service";
import { getActionResult } from "../Util/function";

class DiscountController {
    static async AddDiscountController(req, res) {
        try {
            const result = await DiscountService.AddDiscountService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.create);
        }
    }

    static async GetListDiscountController(req, res) {
        try {
            const result = await DiscountService.GetListDiscountService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.getList);
        }
    }

    static async GetListAllDiscountController(req, res) {
        try {
            const result = await DiscountService.GetListAllDiscountService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.getList);
        }
    }

    static async GetDetailDiscountController(req, res) {
        try {
            const result = await DiscountService.GetDetailDiscountService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.getDetail);
        }
    }

    static async UpdateDiscountController(req, res) {
        try {
            const result = await DiscountService.UpdateDiscountService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.update);
        }
    }
}

export default DiscountController;