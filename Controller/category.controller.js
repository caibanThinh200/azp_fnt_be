import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import CategoryService from "../Service/category.service";
import { getActionResult } from "../Util/function";

class CategoryController {
    static async AddCategoryController(req, res) {
        try {
            const result = await CategoryService.AddCategoryService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.create);
        }
    }

    static async GetListCategoryController(req, res) {
        try {
            const result = await CategoryService.GetListCategoryService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getList);
        }
    }

    static async GetListAllCategoryController(req, res) {
        try {
            const result = await CategoryService.GetListAllCategoryService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getList);
        }
    }

    static async GetDetailCategoryController(req, res) {
        try {
            const result = await CategoryService.GetDetailCategoryService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getDetail);
        }
    }

    static async UpdateCategoryController(req, res) {
        try {
            const result = await CategoryService.UpdateCategoryService(req);
            res.status(200).json(result);
        } catch(e) {
            Logger.getInstance(e, TEXT_DEFINE.STATUS[500]);
            return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.update);
        }
    }
}

export default CategoryController;