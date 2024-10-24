import { Status } from "../../model/enum/status.enum";


export type ProductUpdateDto = {
    productName: string;
    price: number;
    description: string;
    thumbnail: string;
    categoryId: number;
    providerId: number;
    status: Status;
}