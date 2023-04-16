import Logger from "../config/logger";
import TEXT_DEFINE from "../constant/textDefine";
import ProductModel from "../Model/product";
import { getActionResult, removeObjectEmptyValue } from "../Util/function";
import _ from "lodash";
import slugify from "slugify";

class ProductService {
  static async AddProductService(req, res) {
    try {
      const data = req.body;
      const productAdapter = {
        name: data?.name || "",
        code: data?.code || "",
        price: data?.price || 0,
        attribute: data?.attribute || {},
        shortDescription: data?.shortDescription || "",
        detailDescription: data?.detailDescription || "",
        mainThumbs: data?.mainThumb || [],
        subThumbs: data?.subThumb || [],
        discount_value: data?.discount_value || 0,
        product_type: data?.product_type || "",
        category: data?.category || "",
        slug: slugify(data?.name),
        status: data?.status || 1,
      };
      // console.log(productAdapter)
      const productModel = new ProductModel(productAdapter);
      await productModel.save();
      return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT.create);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.create);
    }
  }

  static async GetListProductService(req, res) {
    try {
      let filterParams = req?.query,
        startIndex =
          ((filterParams?.page_index || 1) - 1) *
          (filterParams?.page_size || 10),
        endIndex =
          (filterParams?.page_index || 1) * (filterParams?.page_size || 10),
        sortParams = { updated_at: "desc" };
      if (
        filterParams?.attribute &&
        Object.keys(JSON.parse(filterParams?.attribute)).length > 0
      ) {
        let attributeParams = JSON.parse(filterParams?.attribute);
        Object.keys(attributeParams).map((item) => {
          if (Array.isArray(attributeParams[item])) {
            attributeParams[item].map((k) => {
              filterParams = { ...filterParams, [`attribute.${item}`]: k };
            });
          } else {
            filterParams = {
              ...filterParams,
              [`attribute.${item}`]: attributeParams[item],
            };
          }
        });
        filterParams = _.omit(filterParams, ["attribute"]);
      }
      if (filterParams?.price) {
        let priceQuery = {};
        switch (parseInt(filterParams?.price)) {
          case 1: {
            priceQuery = { $gte: 10000000 };
            break;
          }
          case 2: {
            priceQuery = { $lte: 10000000, $gte: 5000000 };
            break;
          }
          case 3: {
            priceQuery = { $lte: 5000000, $gte: 3000000 };
            break;
          }
          case 4: {
            priceQuery = { $lte: 3000000 };
            break;
          }
          default:
            "";
        }
        filterParams = { ...filterParams, price: priceQuery };
      }
      if (filterParams?.date) {
        switch (parseInt(filterParams?.date)) {
          case 1: {
            sortParams = { ...sortParams, created_at: "desc" };
            break;
          }
          case 2: {
            sortParams = { ...sortParams, created_at: "asc" };
            break;
          }
          default:
            "";
        }
        sortParams = _.omit(sortParams, ["updated_at"]);
      }
      if (filterParams?.created_at) {
        filterParams = {
          ...filterParams,
          created_at: { $gte: new Date(filterParams?.created_at) },
        };
      }
      if (filterParams?.updated_at) {
        filterParams = {
          ...filterParams,
          updated_at: { $gte: new Date(filterParams?.updated_at) },
        };
      }
      if (filterParams?.code) {
        filterParams = _.omit(
          {
            ...filterParams,
            code: { $regex: filterParams?.code },
          },
          // "code"
        );
      }
      filterParams = removeObjectEmptyValue(filterParams);
      const resultAll = await ProductModel.find();
      const resultList =
        Object.keys(filterParams).length > 0
          ? await ProductModel.find(
              _.omit(filterParams, ["page_size", "page_index"])
            ).sort(sortParams)
          : [];
      const responseData = {
        total: resultAll.length,
        page_index: filterParams?.page_index || 1,
        page_size: filterParams?.page_size || 10,
        result: resultList.slice(startIndex, endIndex),
      };
      return {
        status: "SUCCESS",
        ...responseData,
      };
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getList);
    }
  }

  static async GetDetailProductService(req, res) {
    try {
      const id = req.params.id || "";
      const productDetail = await ProductModel.findById(id);
      return getActionResult(200, productDetail);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getDetail);
    }
  }

  static async GetDetailProductByNameService(req, res) {
    try {
      const slug = req.params?.slug || "";
      const productDetail = (await ProductModel.findOne({ slug })) || {};
      const { product_type, category } = productDetail;
      const relatedProduct = await ProductModel.find({
        product_type,
        category,
        _id: { $ne: productDetail?._id },
      });
      const listIdSeen = (req.cookies?.azp_recent || "").split(",") || [];

      const recentProducts =
        listIdSeen?.filter((i) => !!i).length > 0
          ? await Promise.all(
              listIdSeen?.map(async (item) => {
                if (item) {
                  const recentProduct = await ProductModel.findById(item);
                  return recentProduct;
                }
              })
            )
          : [];

      return {
        status: "SUCCESS",
        error: null,
        result: {
          ...productDetail._doc,
          relatedProduct,
          recentProducts,
        },
      };
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.getDetail);
    }
  }

  static async UpdateProductService(req, res) {
    try {
      const currentProduct = await this.GetDetailProductService(req);
      const data = req.body;
      const newData = removeObjectEmptyValue({
        name: data?.name || "",
        price: data?.price || 0,
        attribute: data?.attribute || {},
        shortDescription: data?.shortDescription || "",
        detailDescription: data?.detailDescription || "",
        mainThumbs: data?.mainThumb || [],
        subThumbs: data?.subThumb || [],
        discount_value: data?.discount_value || 0,
        product_type: data?.product_type || "",
        category: data?.category || "",
        slug: slugify(data?.name),
        status: data?.status || 1,
      });
      const updateProduct = { ...currentProduct.result._doc, ...newData };
      // await UpdateCategory(updateProduct);
      // console.log(updateProduct.detailDescription)
      await ProductModel.findByIdAndUpdate(req.params?.id, updateProduct, {
        new: true,
      });
      return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT.update);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT.update);
    }
  }

  static async UpdatePriceService(req, res) {
    try {
      const { price, isPercent } = req.body;
      let newValue = 0;
      await (
        await ProductModel.find().snapshot()
      ).map((doc) => {
        if (isPercent) {
          newValue = doc.price - price;
        } else {
          newValue = (doc.price * price) / 100;
        }
        doc.price = newValue;
        ProductModel.save();
      });
      return getActionResult(200, TEXT_DEFINE.ACTION.PRODUCT.update);
    } catch (e) {
      Logger.getInstance().getLog(e, TEXT_DEFINE.STATUS[500]);
      return getActionResult(500, null, TEXT_DEFINE.ACTION.PRODUCT_TYPE.update);
    }
  }
}

export default ProductService;
