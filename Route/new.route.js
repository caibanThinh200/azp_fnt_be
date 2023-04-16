import express from "express";
import ENDPOINT from "../constant/urls";
import NewController from "../Controller/new.controller";

const route = express.Router();

route.post(ENDPOINT.start, NewController.AddNewController);
route.get(ENDPOINT.start, NewController.GetListNewController);
route.get(ENDPOINT.NEW.all, NewController.GetListAllNewController);
route.get(ENDPOINT.NEW.getDetail, NewController.GetDetailNewController);
route.put(ENDPOINT.NEW.getDetail, NewController.UpdateNewController);

export default route;