import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import LayoutModel from "../Model/layout";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";
import randomstring from "randomstring";

class LayoutService {
  static async AddLayoutService(req, res) {
    try {
      const data = req.body;
      const layoutAdapter = {
        name: data?.name || "",
        introduce: data?.introduce || "",
        phones: data?.phones || "",
        socialMedia: data?.socialMedia || [],
        stores: data?.stores || [],
        store_logo: data?.store_logo || {},
        emails: data?.emails || [],
        tabIcon: data?.tabIcon || "",
      };
      const layoutModel = new LayoutModel(layoutAdapter);
      await layoutModel.save();
      return getActionResult(200, TEXT_DEFINE.ACTION.LAYOUT.create);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.create);
    }
  }

  static async GetListLayoutService(req, res) {
    try {
      const filterParams = req?.query,
        startIndex =
          ((filterParams?.page_index || 1) - 1) *
          (filterParams?.page_size || 10),
        endIndex =
          (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
      const resultAll = await LayoutModel.find();
      const resultList = await LayoutModel.find(filterParams).sort({
        updated_at: "desc",
      });
      // .then(result => result.map(layout => ({
      //     ...layout._doc,
      //     created_at: moment(layout.created_at).format("DD-MM-YYYY hh:mm:ss"),
      //     updated_at: moment(layout.updated_at).format("DD-MM-YYYY hh:mm:ss")
      // })));
      const responseData = {
        total: resultAll.length,
        page_index: filterParams?.page_index || 1,
        page_size: filterParams?.page_size || 10,
        result: resultList.slice(startIndex, endIndex),
      };
      // return getActionResult(200, responseData);
      return {
        status: "SUCCESS",
        error: null,
        ...responseData,
      };
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.getList);
    }
  }

  static async GetListAllLayoutService(req, res) {
    try {
      const resultAll = await LayoutModel.find();
      const responseData = {
        total: resultAll.length,
        result: resultAll,
      };
      // return getActionResult(200, responseData);
      return {
        status: "SUCCESS",
        error: null,
        ...responseData,
      };
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.LAYOUT.getList);
    }
  }

  static async GetDetailLayoutService(req, res) {
    try {
      // const id = req.params.id || "";
      const layoutDetail = await LayoutModel.find();
      return getActionResult(200, layoutDetail[0]);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getDetail);
    }
  }

  static async UpdateLayoutService(req, res) {
    try {
      const currentLayout = await this.GetDetailLayoutService(req);
      const data = req.body;
      const layoutData = {
        name: data?.name || "",
        introduce: data?.introduce || "",
        phones: data?.phones || "",
        socialMedia: data?.socialMedia || [],
        emails: data?.emails || [],
        stores: data?.stores || [],
        store_logo: data?.store_logo || {},
        tabIcon: data?.tabIcon || "",
      };
      if (!currentLayout.result) {
        this.AddLayoutService(req);
      } else {
        const updateLayout = { ...currentLayout.result?._doc, ...layoutData };
        await LayoutModel.findByIdAndUpdate(
          currentLayout.result._doc?._id?.toString(),
          updateLayout
        );
      }
      return getActionResult(200, TEXT_DEFINE.ACTION.CATEGORY.update);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.update);
    }
  }
}

export default LayoutService;
