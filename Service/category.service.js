import _ from "lodash";
import moment from "moment";
import randomstring from "randomstring";
import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import CategoryModel from "../Model/category";
import ProductModel from "../Model/product";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";

class CategoryService {
  static async AddCategoryService(req, res) {
    try {
      const data = req.body;
      const categoryAdapter = {
        name: data?.name || "",
        code:
          randomstring.generate({
            length: 10,
            capitalization: "uppercase",
            charset: "hex",
          }) || "",
        productTypes: data?.productTypes || [],
        products: data?.products || [],
        status: data?.status || 1,
        thumb: data?.thumb || {},
      };
      const categoryModel = new CategoryModel(categoryAdapter);
      await categoryModel.save();
      return getActionResult(200, TEXT_DEFINE.ACTION.CATEGORY.create);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.create);
    }
  }

  static async GetListCategoryService(req, res) {
    try {
      const filterParams = req?.query,
        startIndex =
          ((filterParams?.page_index || 1) - 1) *
          (filterParams?.page_size || 10),
        endIndex =
          (filterParams?.page_index || 1) * (filterParams?.page_size || 10);
      const resultAll = await CategoryModel.find().sort({ updated_at: "desc" });
      const resultList = await CategoryModel.find(filterParams)
        .populate("products")
        .populate("productTypes")
        .limit(filterParams?.limit ? filterParams?.limit : 0)
        .skip(filterParams?.skip ? filterParams?.skip : 0)
        .sort({ updated_at: "desc" });

      const categoryResponse = resultList.map(async (category) => {
        const newProductTypes = (category.productTypes || []).map(
          async (type) => {
            const products = await ProductModel.find({
              category: category._id,
              product_type: type._id,
            });
            return {
              ...type._doc,
              products: products,
            };
          }
        );
        const promise = await Promise.all(newProductTypes);
        return {
          ...category._doc,
          productTypes: promise,
        };
      });

      const result = await Promise.all(categoryResponse);
      const responseData = {
        total: resultAll.length,
        page_index: filterParams?.page_index || 1,
        page_size: filterParams?.page_size || 10,
        result: result.slice(startIndex, endIndex),
        isFull:
          resultAll[resultAll.length - 1]?.id ===
          resultList[resultList.length - 1]?.id,
      };
      return {
        status: "SUCCESS",
        error: null,
        ...responseData,
      };
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getList);
    }
  }

  static async GetListAllCategoryService(req, res) {
    try {
      const result = await CategoryModel.find()
        .populate("products")
        .populate("productTypes");
      const responseData = {
        total: result.length,
        result: result,
      };
      // return getActionResult(200, responseData);
      return {
        status: "SUCCESS",
        ...responseData,
      };
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getList);
    }
  }

  static async GetDetailCategoryService(req, res) {
    try {
      const id = req.params.id || "";
      const categoryDetail = await CategoryModel.findById(id)
        .populate("products")
        .populate("productTypes");
      const newProductTypes = (categoryDetail.productTypes || []).map(
        async (type) => {
          const products = await ProductModel.find({
            category: categoryDetail._id,
            product_type: type._id,
          });
          return {
            ...type._doc,
            products: products,
          };
        }
      );

      const responseData = {
        ...categoryDetail._doc,
        productTypes: await Promise.all(newProductTypes),
      };
      return getActionResult(200, responseData);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.getDetail);
    }
  }

  static async UpdateCategoryService(req, res) {
    try {
      const currentProduct = await this.GetDetailCategoryService(req);
      const newData = removeObjectEmptyValue({
        name: req.body?.name || "",
        code: req.body?.code || "",
        products: req.body?.products || [],
        productTypes: req.body?.productTypes || [],
        status: req.body?.status || 1,
        thumb: req.body?.thumb || {},
      });
      // console.log(newData)
      const updateProduct = { ...currentProduct.result?._doc, ...newData };
      await CategoryModel.findByIdAndUpdate(req.params?.id, updateProduct);
      return getActionResult(200, TEXT_DEFINE.ACTION.CATEGORY.update);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.CATEGORY.update);
    }
  }
}

export default CategoryService;
