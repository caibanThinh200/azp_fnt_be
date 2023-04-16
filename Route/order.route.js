import express from "express";
import ENDPOINT from "../constant/urls";
import OrderController from "../Controller/order.controller";

const route = express.Router();

route.post(ENDPOINT.start, OrderController.CheckoutOrderController);
route.put(ENDPOINT.ORDER.payment, OrderController.UpdateOrderController);
route.get(ENDPOINT.ORDER.getDetail, OrderController.GetOrderDetailController);
route.get(ENDPOINT.start, OrderController.GetListOrderController);
route.get(ENDPOINT.ORDER.getRevenue, OrderController.GetOrderRevenueController);
route.put(ENDPOINT.ORDER.updateStatus, OrderController.UpdateOrderStatusController);

export default route;