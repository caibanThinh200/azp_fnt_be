import express from "express";
import ENDPOINT from "../constant/urls";
import DiscountController from "../Controller/discount.controller";

const route = express.Router();

route.post(ENDPOINT.start, DiscountController.AddDiscountController);
route.get(ENDPOINT.start, DiscountController.GetListDiscountController);
route.get(ENDPOINT.DISCOUNT.all, DiscountController.GetListAllDiscountController);
route.get(ENDPOINT.DISCOUNT.getDetail, DiscountController.GetDetailDiscountController);
route.put(ENDPOINT.DISCOUNT.getDetail, DiscountController.UpdateDiscountController);

export default route;