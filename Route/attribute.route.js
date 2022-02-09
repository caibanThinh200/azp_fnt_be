import express from "express";
import ENDPOINT from "../constant/urls";
import AttributeController from "../Controller/attribute.controller";

const route = express.Router();

route.post(ENDPOINT.start, AttributeController.AddAttributeController);
route.get(ENDPOINT.start, AttributeController.GetListAttributeController);
route.get(ENDPOINT.ATTRIBUTE.all, AttributeController.GetListAllAttributeController);
route.get(ENDPOINT.ATTRIBUTE.getDetail, AttributeController.GetDetailAttributeController);
route.put(ENDPOINT.ATTRIBUTE.getDetail, AttributeController.UpdateAttributeController);

export default route;