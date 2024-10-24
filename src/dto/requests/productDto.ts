import { Status } from "../../model/enum/status.enum";

export type ProductDto = {
    productName?: string;
    price?: number;
    description?: string;
    thumbnail?: number;
    categoryId?: number | string;
    providerId?: number | string;
    images?: File[];
    status?: Status;
}