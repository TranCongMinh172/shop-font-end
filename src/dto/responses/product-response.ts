import { ProductDetailModel } from "../../model/product-detail.model"
import { ProductImageModel } from "../../model/product-image.model"
import { ProductModel } from "../../model/product.model"

export type ProductResponse = {
    product: ProductModel,
    productDetails?: ProductDetailModel[],
    productImages?: ProductImageModel[]
}