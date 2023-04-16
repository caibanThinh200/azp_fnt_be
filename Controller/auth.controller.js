import TEXT_DEFINE from "../constant/textDefine";
import AuthService from "../Service/auth.service";
import { getActionResult } from "../Util/function";

class AuthController {
    static async RegisterController(req, res) {
        try {
            const result = await AuthService.RegisterService(req);
            res.status(200).json(result);
        } catch(e) {    
            res.status(500).json(getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.register))
        }
    }

    static async LoginController(req, res) {
        try {
            const result = await AuthService.LoginService(req);
            res.status(200).json(result);
        } catch(e) {    
            res.status(500).json(getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.login))
        }
    }

    static async GetUserByTokenController(req, res) {
        try {
            const result = await AuthService.GetUserByTokenService(req);
            res.status(200).json(result);
        } catch(e) {    
            res.status(500).json(getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.getDetail))
        }
    }

    static async GetUserByIdController(req, res) {
        try {
            const result = await AuthService.GetUserByIdService(req);
            res.status(200).json(result);
        } catch(e) {    
            res.status(500).json(getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.getDetail))
        }
    }

    static async UpdateUserController(req, res) {
        try {
            const result = await AuthService.UpdateUserService(req);
            res.status(200).json(result);
        } catch(e) {    
            res.status(500).json(getActionResult(500, null, TEXT_DEFINE.ACTION.AUTH.update))
        }
    }
}

export default AuthController;