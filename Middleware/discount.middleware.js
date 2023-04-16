import discountModel from "../Model/discount"
import ProductModel from "../Model/product";

export const UpdateActiveDiscount = async document => {
    const previousDiscount = await discountModel.findOne({ _id: { $ne: document._id }, status: 1 });
    const updateDiscount = await discountModel.updateMany({ _id: { $ne: document._id } }, { status: 0 });
    const updateProduct = await (await ProductModel.find().snapshot()).map(async product => {
        let discountPrice = product?.discount_price || 0;
        discountPrice = document.isPercent ? product.price - (product.price * document?.discount_value / 100) : product.price - document.discount_value;
        await ProductModel.findByIdAndUpdate(product._id, {
            discount_price: Math.round(discountPrice),
            isPercent: document?.isPercent,
            discount_value: document?.discount_value
        })
    })
}