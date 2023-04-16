import { responseAuthorizeRequest } from "../Util/function";
import AuthModel from "../Model/auth";

export const ValidateJWT = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "") || "";
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return responseAuthorizeRequest(err.message, res);
      } else {
        next();
      }
    })
  }
  
export const Authorization = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "") || "";
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        const currentUser = await AuthModel.findById(decoded?.id);
        if (err || currentUser && currentUser.role !== "admin") {
            return responseAuthorizeRequest(err.message, res);
        } else {
            next();
        }
    })
}