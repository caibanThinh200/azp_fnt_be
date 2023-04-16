import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import UploadService from "../Service/upload.service";
import { getActionResult } from "../Util/function";

class UploadController {
    static async UploadFileController(req, res) {
        try {
            const result = await UploadService.UploadSingleFileService(req);
            res.status(200).json(result);
        } catch (e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            res.status(500).json(getActionResult(500, null, TEXT_DEFINE.ACTION.UPLOAD.create));
        }
    }
}

export default UploadController;