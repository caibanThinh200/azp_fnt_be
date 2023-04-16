import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import NewService from "../Service/new.service";
import { getActionResult } from "../Util/function";

class NewController {
    static async AddNewController(req, res) {
        try {
            const result = await NewService.AddNewService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.create);
        }
    }

    static async GetListNewController(req, res) {
        try {
            const result = await NewService.GetListNewService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.getList);
        }
    }

    static async GetListAllNewController(req, res) {
        try {
            const result = await NewService.GetListAllNewService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.getList);
        }
    }

    static async GetDetailNewController(req, res) {
        try {
            const result = await NewService.GetDetailNewService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.getDetail);
        }
    }

    static async UpdateNewController(req, res) {
        try {
            const result = await NewService.UpdateNewService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.update);
        }
    }
}

export default NewController;