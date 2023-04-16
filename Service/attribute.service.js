import moment from "moment";
import randomstring from "randomstring";
import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import AttributeModel from "../Model/attributes";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";

class AttributeService {
    static async AddAttributeService(req, res) {
        try {
            const data = req.body;
            const attributeAdapter = {
                name: data?.name || "",
                code: randomstring.generate({
                    length: 10,
                    capitalization: "uppercase",
                    charset: "hex"
                }) || "",
                unit: data?.unit || "",
                status: data?.status || 1,
                filter: data?.filter || "",
                require: data?.require || false
            }
            const attributeModel = new AttributeModel(attributeAdapter);
            await attributeModel.save();
            return getActionResult(200, TEXT_DEFINE.ACTION.ATTRIBUTE.create);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.create);
        }
    }

    static async GetListAttributeService(req, res) {
        try {
            const filterParams = req?.query,
                startIndex = ((filterParams?.page_index || 1) - 1) * (filterParams?.page_size || 10),
                endIndex = (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
            const resultAll = await AttributeModel.find();
            const resultList = await AttributeModel.find(filterParams)
            .sort({ updated_at: "desc" });
            // .then(result => result.map(attribute => ({
            //     ...attribute._doc,
            //     created_at: moment(attribute.created_at).format("DD-MM-YYYY hh:mm:ss"),
            //     updated_at: moment(attribute.updated_at).format("DD-MM-YYYY hh:mm:ss")
            // })));
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
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.getList);
        }
    }

    static async GetListAllAttributeService(req, res) {
        try {
            const resultAll = await AttributeModel.find();
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
            return getActionResult(500, null, TEXT_DEFINE.ACTION.ATTRIBUTE.getList);
        }
    }

    static async GetDetailAttributeService(req, res) {
        try {
            const id = req.params.id || "";
            const attributeDetail = await AttributeModel.findById(id);
            return getActionResult(200, attributeDetail);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getDetail);
        }
    }

    static async UpdateAttributeService(req, res) {
        try {
            const currentAttribute = await this.GetDetailAttributeService(req);
            const newData = removeObjectEmptyValue({
                name: req.body?.name || "",
                code: req.body?.code || "",
                status: req.body?.status || 1,
                require: req.body?.require || false,
                required_field: req.body?.required_field || false,
                value_type: req.body?.value_type || 2,
                filter: req.body?.filter || "",
                unit: req.body?.unit || ""
            });
            const updateAttribute = { ...currentAttribute.result._doc, ...newData };
            await AttributeModel.findByIdAndUpdate(req.params?.id, updateAttribute);
            return getActionResult(200, TEXT_DEFINE.ACTION.CATEGORY.update);
        } catch (e) {
            Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.update);
        }
    }
}

export default AttributeService;