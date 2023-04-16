import express from "express";
import ENDPOINT from "../constant/urls";
import ProductController from "../Controller/product.controller";
import upload from "../config/uploadFile";

const route = express.Router();

route.post(ENDPOINT.start, ProductController.AddProductController);
route.get(ENDPOINT.start, ProductController.GetListProductController);
route.get(ENDPOINT.PRODUCT.getDetail, ProductController.GetDetailProductController);
route.get(ENDPOINT.PRODUCT.getDetailClient, ProductController.GetDetailProductByNameController);
route.put(ENDPOINT.PRODUCT.getDetail, ProductController.UpdateProductController);
route.put(ENDPOINT.start, ProductController.UpdateProductController);

export default route;