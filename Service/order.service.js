import randomstring from "randomstring";
import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import OrderModel from "../Model/order";
import { getActionResult } from "../Util/function";
import * as emailjs from "emailjs";
import nodemailer from "nodemailer";
import sendEmail from "../config/nodemailer";
import _ from "lodash";
import AttributeModel from "../Model/attributes";

class OrderService {
    static async checkoutOrderService(req, res) {
        try {
            let data = req.body;
            let shipCost = 0;
            const currentStoreProvince = "Thành phố Hồ Chí Minh";
            const productWeightId = _.get(await AttributeModel.findOne({ name: "Trọng lượng sản phẩm" }), "_id", "");
            if (data?.contact?.province === currentStoreProvince) {
                shipCost += 50000;
            } else {
                shipCost += 100000;
            }
            if ((data?.orders || []).length > 0) {
                const totalWeight = (data?.orders || []).reduce((order, wieght) => {
                    let productWeight = _.get(order?.attribute, productWeightId, "")?.replace("kg", "") || 0;
                    return wieght + productWeight;
                }, 0)
                if (totalWeight >= 5 && totalWeight < 10) {
                    shipCost += 50000;
                }
                if (totalWeight >= 10) {
                    shipCost += 100000;
                }
            }
            data = {
                ...data,
                cost: { ...data?.cost, totalOrder: data?.cost?.totalOrder + shipCost }
            }
            const checkoutAdapter = {
                contact: {
                    name: data?.contact?.name || "",
                    address: data?.contact?.address || "",
                    email: data?.contact?.email || "",
                    phone: data?.contact?.phone || "",
                    address: data?.contact?.address || "",
                    note: data?.contact?.note || "",
                    province: data?.contact?.province || "",
                    district: data?.contact?.district || "",
                    ward: data?.contact?.ward || "",
                },
                orders: (data?.orders || []).map(order => ({ product: order?.id, quantity: order?.quantity || 1 })) || [],
                status: data?.status || 1,
                code: "AZP-ORDER-" + randomstring.generate({
                    length: 4,
                    capitalization: "uppercase",
                    charset: "hex"
                }) || "",
                cost: {
                    totalOrder: data?.cost?.totalOrder || 0,
                    VATCost: data?.cost?.VATCost || 0,
                    ship: shipCost,
                    totalCost: data?.cost?.totalCost || 0,
                },
                payment: data?.payment || 1
            }
            const orderModel = new OrderModel(checkoutAdapter);
            return await orderModel.save()
                .then(async res => {
                    const orderResponse = await OrderModel.findOne(res).populate({
                        path: "orders",
                        populate: {
                            path: "product"
                        }
                    });
                    return {
                        status: "SUCCESS",
                        error: null,
                        result: orderResponse
                    }
                });
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.create);
        }
    }

    static async orderPaymentService(req, res) {
        try {
            const orderId = req.params?.id;
            const data = req.body;
            const updateOrder = {
                status: data?.status || 1
            };
            await OrderModel.findByIdAndUpdate(orderId, updateOrder, { new: true }).then(async res => {
                const orderResult = await OrderModel.findOne(res).populate({
                    path: "orders",
                    populate: "product"
                });
                const paymentInfo = {
                    contact: {
                        name: orderResult?.contact?.name || "",
                        address: orderResult?.contact?.address || "",
                        email: orderResult?.contact?.email || "",
                        phone: orderResult?.contact?.phone || "",
                        address: orderResult?.contact?.address || "",
                        note: orderResult?.contact?.note || ""
                    },
                    code: orderResult?.code,
                    orders: orderResult.orders,
                    paymentMethod: orderResult?.payment || 1,
                    cost: {
                        totalOrder: orderResult?.cost?.totalOrder || 0,
                        VATCost: orderResult?.cost?.VATCost || 0,
                        ship: orderResult?.cost?.ship || 0,
                        totalCost: orderResult?.cost?.totalCost || 0,
                    }
                }
                sendEmail(orderResult?.contact?.email, 'Bạn có đơn hàng mới từ AZP', paymentInfo)
            });
            return getActionResult(200, TEXT_DEFINE.ACTION.ORDER.update);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.create);
        }
    }

    static async getDetailOrderService(req, res) {
        try {
            const orderId = req.params?.id;
            const orderResult = await OrderModel.findById(orderId);
            return {
                status: "SUCCESS",
                error: null,
                result: orderResult
            }
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getDetail);
        }
    }

    static async getListOrderService(req) {
        try {
            const filterParams = req?.query,
                startIndex = ((filterParams?.page_index || 1) - 1) * (filterParams?.page_size || 10),
                endIndex = (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
            const resultAll = await OrderModel.find();
            const resultList = await OrderModel.find(filterParams)
                .populate({
                    path: "orders",
                    populate: "product"
                })
                .sort({ updated_at: "desc" });
            const responseData = {
                total: resultAll.length,
                page_index: parseInt(filterParams?.page_index) || 1,
                page_size: parseInt(filterParams?.page_size) || 10,
                result: resultList.slice(startIndex, endIndex)
            }
            return {
                status: "SUCCESS",
                error: null,
                ...responseData
            }
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getList);
        }
    }

    static async getOrderRevenueService(req) {
        try {
            const orderContacts = await OrderModel.find({ status: 3 })
                .then(orders => {
                    const orderPhones = orders.map((order) => order.contact?.phone);
                    const uniqueContacts = orderPhones.filter((phone, index) => orderPhones.indexOf(phone) === index);
                    return uniqueContacts
                });
            const totalRevenue = await OrderModel.find({ status: 3 })
                .then(orders => {
                    const orderCost = orders.map((order) => order.cost?.totalOrder);
                    const uniqueRevenue = orderCost.reduce((cost, current) => cost + current, 0)
                    return uniqueRevenue
                });
            const approveOrder = await OrderModel.find({ status: 3 });
            const cancelOrder = await OrderModel.find({ status: 4 });
            return {
                status: "SUCCESS",
                error: null,
                result: {
                    contacts: orderContacts.length,
                    total: Math.round(totalRevenue),
                    approve: approveOrder.length,
                    cancel: cancelOrder.length
                }
            }
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.getRevenue);
        }
    }

    static async updateOrderStatusService(req) {
        try {
            const orderId = req.params?.id;
            const status = req.body?.status || 1;
            return await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true })
                .then(() => {
                    return getActionResult(200, TEXT_DEFINE.ACTION.ORDER.update)
                })
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ORDER.update);
        }
    }
}

export default OrderService;