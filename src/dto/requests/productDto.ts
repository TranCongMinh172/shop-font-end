export type ProductDto = {
    productName?: string;
    productPrice?: number;
    productDescription?: string;
    thumbnail?: number;
    categoryId?: number | string;
    providerId?: number | string;
    images?: File[];
}