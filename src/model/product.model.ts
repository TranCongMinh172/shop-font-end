import { CategoryModel } from "./category.model";
import { Status } from "./enum/status.enum";
import { ProviderModel } from "./privoder.model";

export type ProductModel = {
    id?: number;
    productName?: string;
    productPrice?: number;
    category?: CategoryModel;
    avgRating?: number;
    numberOfRating?: number;
    provider?: ProviderModel;
    productDescription?: string;
    thumbnail?: string;
    productStatus?: Status;
    totalQuantity?: number;

}