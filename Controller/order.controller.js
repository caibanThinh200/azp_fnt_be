import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import OrderService from "../Service/order.service";
import { getActionResult } from "../Util/function";

class OrderController {
    static async CheckoutOrderController(req, res) {
        try {
            const result = await OrderService.checkoutOrderService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.create);
        }
    }

    static async UpdateOrderController(req, res) {
        try {
            const result = await OrderService.orderPaymentService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.update);
        }
    }
    
    static async GetOrderDetailController(req, res) {
        try {
            const result = await OrderService.getDetailOrderService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getDetail);
        }
    }
    static async GetListOrderController(req, res) {
        try {
            const result = await OrderService.getListOrderService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getDetail);
        }
    }
    static async GetOrderRevenueController(req, res) {
        try {
            const result = await OrderService.getOrderRevenueService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getRevenue);
        }
    }
    static async UpdateOrderStatusController(req, res) {
        try {
            const result = await OrderService.updateOrderStatusService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getDetail);
        }
    }
}

export default OrderController;