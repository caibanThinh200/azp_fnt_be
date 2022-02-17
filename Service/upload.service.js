import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import { getActionResult } from "../Util/function";
import cloudinaryV2 from "../config/cloudinary";

class UploadService {
    static UploadSingleFileService(req, res) {
        try {
            const file = req.file;
            return cloudinaryV2.uploader.upload(`Upload/${file?.filename}` || "", {
                upload_preset: 'azp_upload',
            }, async (err, result) => {
                if (err) {
                    console.log(err);
                    Logger.getInstance(err, TEXT_DEFINE.STATUS[500]);
                    return getActionResult(500, null, TEXT_DEFINE.ACTION.UPLOAD.create);
                }
                else {
                    // const { resources } = await cloudinaryV2.search
                    //     .expression('folder:azp_upload')
                    //     .sort_by('public_id', 'desc')
                    //     .max_results(30)
                    //     .execute();

                    // const publicIds = resources.map((file) => file.public_id);
                    return getActionResult(200, result);
                }
            })
        } catch (e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.UPLOAD.create);
        }
    }
}

export default UploadService;