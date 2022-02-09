import express from "express";
import ENDPOINT from "../constant/urls";
import AuthController from "../Controller/auth.controller";

const route = express.Router();

route.post(ENDPOINT.AUTH.register, AuthController.RegisterController);
route.post(ENDPOINT.AUTH.login, AuthController.LoginController);
route.get(ENDPOINT.AUTH.getAuthToken, AuthController.GetUserByTokenController);
route.get(ENDPOINT.AUTH.getDetail, AuthController.GetUserByIdController);
route.put(ENDPOINT.AUTH.getDetail, AuthController.UpdateUserController);

export default route;