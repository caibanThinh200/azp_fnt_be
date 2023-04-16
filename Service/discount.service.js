import moment from "moment";
import randomstring from "randomstring";
import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import DiscountModel from "../Model/discount";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";

class DiscountService {
    static async AddDiscountService(req, res) {
        try {
            const data = req.body;
            const discountAdapter = {
                name: data?.name || "",
                code: randomstring.generate({
                    length: 10,
                    capitalization: "uppercase",
                    charset: "hex"
                }) || "",
                isPercent: data?.isPercent || false,
                discount_value: data?.discount_value || 0
            }
            const discountModel = new DiscountModel(discountAdapter);
            await discountModel.save();
            return getActionResult(200, TEXT_DEFINE.ACTION.DISCOUNT.create);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.create);
        }
    }

    static async GetListDiscountService(req, res) {
        try {
            const filterParams = req?.query,
                startIndex = ((filterParams?.page_index || 1) - 1) * (filterParams?.page_size || 10),
                endIndex = (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
            const resultAll = await DiscountModel.find();
            const resultList = await DiscountModel.find(filterParams)
                .sort({ created_at: "asc" });
            const responseData = {
                total: resultAll.length,
                page_index: filterParams?.page_index || 1,
                page_size: filterParams?.page_size || 10,
                result: resultList.slice(startIndex, endIndex)
            }
            // return getActionResult(200, responseData);
            return {
                status: "SUCCESS",
                error: null,
                ...responseData
            }
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.getList);
        }
    }

    static async GetListAllDiscountService(req, res) {
        try {
            const resultAll = await DiscountModel.find();
            const responseData = {
                total: resultAll.length,
                result: resultAll
            }
            // return getActionResult(200, responseData);
            return {
                status: "SUCCESS",
                error: null,
                ...responseData
            }
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.DISCOUNT.getList);
        }
    }

    static async GetDetailDiscountService(req, res) {
        try {
            const id = req.params.id || "";
            const discountDetail = await DiscountModel.findById(id);
            return getActionResult(200, discountDetail);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getDetail);
        }
    }

    static async UpdateDiscountService(req, res) {
        try {
            const currentDiscount = await this.GetDetailDiscountService(req);
            const newData = removeObjectEmptyValue({
                name: req.body?.name || "",
                code: randomstring.generate({
                    length: 10,
                    capitalization: "uppercase",
                    charset: "hex"
                }) || "",
                status: req.body?.status || 0,
                isPercent: req.body?.isPercent || false,
                discount_value: req.body?.discount_value || 0
            });
            const updateDiscount = { ...currentDiscount.result._doc, ...newData };
            await DiscountModel.findByIdAndUpdate(req.params?.id, updateDiscount, { new: true })
            return getActionResult(200, TEXT_DEFINE.ACTION.CATEGORY.update);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.update);
        }
    }
}

export default DiscountService;