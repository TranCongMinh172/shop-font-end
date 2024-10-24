import { ProductModel } from "../../model/product.model";

export type ProductUserResponse = {
    product: ProductModel;
    discount?: number;
    discountedPrice?: number;
    expiredDate?: Date;    
}