import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import AttributeService from "../Service/attribute.service";
import { getActionResult } from "../Util/function";

class AttributeController {
    static async AddAttributeController(req, res) {
        try {
            const result = await AttributeService.AddAttributeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.create);
        }
    }

    static async GetListAttributeController(req, res) {
        try {
            const result = await AttributeService.GetListAttributeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.getList);
        }
    }

    static async GetListAllAttributeController(req, res) {
        try {
            const result = await AttributeService.GetListAllAttributeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.getList);
        }
    }

    static async GetDetailAttributeController(req, res) {
        try {
            const result = await AttributeService.GetDetailAttributeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.getDetail);
        }
    }

    static async UpdateAttributeController(req, res) {
        try {
            const result = await AttributeService.UpdateAttributeService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.update);
        }
    }
}

export default AttributeController;