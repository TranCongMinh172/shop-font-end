import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ProductDetailDto } from "../dto/requests/product-detail";
import { ResponseSuccess } from "../dto/responses/response.success";
import { ProductDetailModel } from "../model/product-detail.model";

export const getALlProductDetails = async (): Promise<ResponseSuccess<ProductDetailModel[]>> => {
    try {
        const response = await requestConfig(
            'productDetails',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const createProductDetails = async (productDetailDto: ProductDetailDto): Promise<ResponseSuccess<ProductDetailModel>> => {
    try {
        const response = await requestConfig(
            'productDetails',
            Method.POST,
            productDetailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const updatePatchProductDetails = async (id:number=-1 ,productDetailDto: ProductDetailDto): Promise<ResponseSuccess<ProductDetailModel>> => {
    try {
        const response = await requestConfig(
            'productDetails/' + id, 
            Method.PATCH,
            productDetailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const deleteProductDetails = async (id:number=-1): Promise<ResponseSuccess<ProductDetailModel>> => {
    try {
        const response = await requestConfig(
            'productDetails',
            Method.DELETE,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}