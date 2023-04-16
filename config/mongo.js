import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";
import Logger from "./logger";

class MongoProvider {
    static instance;
    static getInstance() {
        if(!this.instance) {
            this.instance = new MongoProvider();
        }
        return MongoProvider.instance;
    }

    connect(connectString) {
        mongoose.connect(connectString, (err) => {
            if(err) {
                Logger.getInstance().getLog(`${TEXT_DEFINE.SERVER.databaseFailed}: ${err}`, TEXT_DEFINE.STATUS[500]);
            } else {
                Logger.getInstance().getLog(TEXT_DEFINE.SERVER.databaseConnect, TEXT_DEFINE.STATUS[200]);
            }
        });
    }
}

export default MongoProvider;