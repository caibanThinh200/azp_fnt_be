import express from "express";
import ENDPOINT from "../constant/urls";
import ProductTypeController from "../Controller/product-type.controller";

const route = express.Router();

route.post(ENDPOINT.start, ProductTypeController.AddProductTypeController);
route.get(ENDPOINT.start, ProductTypeController.GetListProductTypeController);
route.get(ENDPOINT.PRODUCT_TYPE.all, ProductTypeController.GetListAllProductTypeController);
route.get(ENDPOINT.PRODUCT_TYPE.getDetail, ProductTypeController.GetDetailProductTypeController);
route.put(ENDPOINT.PRODUCT_TYPE.getDetail, ProductTypeController.UpdateProductTypeController);

export default route;