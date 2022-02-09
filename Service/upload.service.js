import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import { getActionResult } from "../Util/function";

class UploadService {
    static UploadSingleFileService(req, res) {
        try {
            const file = req.file;
            return getActionResult(200, file);
        } catch(e) {
            Logger(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.UPLOAD.create);
        }
    }
}

export default UploadService;