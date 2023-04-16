import Logger from "../config/logger";
import bcrypt from "bcrypt";
import TEXT_DEFINE from "../constant/textDefine";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";
import AuthModel from "../Model/auth";
import jwt from "jsonwebtoken";

class AuthService {
    static async RegisterService(req, res) {
        try {
            const userData = req.body;
            const userAdapter = {
                username: userData?.username || "",
                password: bcrypt.hashSync(userData?.password, 10),
                permission: userData?.permission || [],
                role: userData?.role || "admin"
            }
            const userModel = new AuthModel(userAdapter);
            await userModel.save();
            return getActionResult(200, TEXT_DEFINE.ACTION.AUTH.register);
        } catch(e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.register);
        }
    }

    static async LoginService(req, res) {
        try {
            const userData = req.body;
            const currentUser = await AuthModel.findOne({username: userData?.username});
            // console.log(currentUser, userData.password, bcrypt.compareSync(userData?.password, currentUser?.password))
            if(Object.keys(currentUser || {}).length > 0 && bcrypt.compareSync(userData?.password, currentUser?.password)) {
                const token = jwt.sign({id: currentUser?._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7day"});
                const response = {
                    message: TEXT_DEFINE.ACTION.AUTH.login,
                    token
                }
                return getActionResult(200, response)
            } else {
                return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.login, TEXT_DEFINE.ERROR.invalidLogin);
            }
        } catch(e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.login);
        }
    }

    static async GetUserByTokenService(req, res) {
        try {
            const token = req.headers["authorization"].replace("Bearer ", "");
            return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
                if(err) {
                    Logger.getInstance().getLog(err, TEXT_DEFINE.STATUS[500]);
                    return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.getDetail, err);
                } else {
                    const user = await AuthModel.findOne({id: decoded?.id});
                    return getActionResult(200, user);
                }
            })
        } catch(e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.getDetail);
        }
    }

    static async GetUserByIdService(req, res) {
        try {
            const id = req.params?.id || "";
            const currentUser = await AuthModel.findById(id);
            return getActionResult(200, currentUser);
        } catch(e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.getDetail);
        }
    }

    static async UpdateUserService(req, res) {
        try {
            const currentUser = await this.GetUserByIdService(req);
            const updateDataAdapter = removeObjectEmptyValue({
                username: req.body?.username || "",
                permission: req.body?.permission || []
            });
            const newData =  { ...currentUser, ...updateDataAdapter };
            await AuthModel.findByIdAndUpdate(req.params?.id, newData);
            return getActionResult(200, TEXT_DEFINE.ACTION.AUTH.update);
        } catch(e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.update);
        }
    }
}  

export default AuthService;