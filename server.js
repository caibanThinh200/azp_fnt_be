import dotenv from "dotenv";
import Logger from "./config/logger";
import http from "http";
import TEXT_DEFINE from "./constant/textDefine";
import app from "./app";

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3501;

server.listen(PORT, (err) => {
    if(!err) {
        Logger.getInstance().getLog(TEXT_DEFINE.SERVER.success.replace("%s", PORT), TEXT_DEFINE.STATUS[200]);
    } else {
        Logger.getInstance().getLog(TEXT_DEFINE.SERVER.error, TEXT_DEFINE.STATUS[500]);
    }
});