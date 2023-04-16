import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import LayoutService from "../Service/layout.service";
import { getActionResult } from "../Util/function";

class LayoutController {
    static async AddLayoutController(req, res) {
        try {
            const result = await LayoutService.AddLayoutService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.create);
        }
    }

    static async GetListLayoutController(req, res) {
        try {
            const result = await LayoutService.GetListLayoutService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.getList);
        }
    }

    static async GetListAllLayoutController(req, res) {
        try {
            const result = await LayoutService.GetListAllLayoutService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.getList);
        }
    }

    static async GetDetailLayoutController(req, res) {
        try {
            const result = await LayoutService.GetDetailLayoutService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.getDetail);
        }
    }

    static async UpdateLayoutController(req, res) {
        try {
            const result = await LayoutService.UpdateLayoutService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.update);
        }
    }
}

export default LayoutController;