import express from "express";
import ENDPOINT from "../constant/urls";
import CategoryController from "../Controller/category.controller";

const route = express.Router();

route.post(ENDPOINT.start, CategoryController.AddCategoryController);
route.get(ENDPOINT.start, CategoryController.GetListCategoryController);
route.get(ENDPOINT.CATEGORY.all, CategoryController.GetListAllCategoryController)
route.get(ENDPOINT.CATEGORY.getDetail, CategoryController.GetDetailCategoryController);
route.put(ENDPOINT.CATEGORY.getDetail, CategoryController.UpdateCategoryController);

export default route;