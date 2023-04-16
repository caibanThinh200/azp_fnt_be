import express from "express";
import ENDPOINT from "../constant/urls";
import LayoutController from "../Controller/layout.controller";

const route = express.Router();

route.post(ENDPOINT.start, LayoutController.AddLayoutController);
route.get(ENDPOINT.start, LayoutController.GetListLayoutController);
route.get(ENDPOINT.LAYOUT.all, LayoutController.GetListAllLayoutController);
route.get(ENDPOINT.LAYOUT.getDetail, LayoutController.GetDetailLayoutController);
route.put(ENDPOINT.LAYOUT.getDetail, LayoutController.UpdateLayoutController);

export default route;