import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import NewModel from "../Model/new";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";
import randomstring from "randomstring";

class NewService {
  static async AddNewService(req, res) {
    try {
      const data = req.body;
      const newAdapter = {
        type: data?.type || 0,
        title: data?.title || "",
        code:
          randomstring.generate({
            length: 10,
            capitalization: "uppercase",
            charset: "hex",
          }) || "",
        author: data?.author || "",
        content: data?.content || "",
        status: data?.status || 0,
        thumb: data?.thumb || "",
        favorite: data?.favorite || 0,
      };
      const newModel = new NewModel(newAdapter);
      await newModel.save();
      return getActionResult(200, TEXT_DEFINE.ACTION.NEW.create);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.create);
    }
  }

  static async GetListNewService(req, res) {
    try {
      const filterParams = req?.query,
        startIndex =
          ((filterParams?.page_index || 1) - 1) *
          (filterParams?.page_size || 10),
        endIndex =
          (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
      const resultAll = await NewModel.find();
      const resultList = await NewModel.find(filterParams).sort({
        updated_at: "desc",
      });
      // .then(result => result.map(new => ({
      //     ...new._doc,
      //     created_at: moment(new.created_at).format("DD-MM-YYYY hh:mm:ss"),
      //     updated_at: moment(new.updated_at).format("DD-MM-YYYY hh:mm:ss")
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
      return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.getList);
    }
  }

  static async GetListAllNewService(req, res) {
    try {
      const resultAll = await NewModel.find();
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
      return getActionResult(500, null, TEXT_DEFINE.ACTION.NEW.getList);
    }
  }

  static async GetDetailNewService(req, res) {
    try {
      const id = req.params.id || "";
      const newDetail = await NewModel.findById(id);
      return getActionResult(200, newDetail);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getDetail);
    }
  }

  static async UpdateNewService(req, res) {
    try {
      const currentNew = await this.GetDetailNewService(req);
      const data = req.body;
      const newData = {
        type: data?.type || 0,
        title: data?.title || "",
        author: data?.author || {},
        status: data?.status || 0,
        content: data?.content || "",
        thumb: data?.thumb || {},
        favorite: data?.favorite || 0,
      };
      const updateNew = { ...currentNew.result._doc, ...newData };
      await NewModel.findByIdAndUpdate(req.params?.id, updateNew);
      return getActionResult(200, TEXT_DEFINE.ACTION.CATEGORY.update);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.update);
    }
  }
}

export default NewService;
