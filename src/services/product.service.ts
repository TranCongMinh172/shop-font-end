import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ProductDto } from "../dto/requests/productDto";
import { ProductResponse } from "../dto/responses/product-response";
import { ResponseSuccess } from "../dto/responses/response.success";
import { ProductModel } from "../model/product.model";

export const getAllProdcucts = async (): Promise<ResponseSuccess<ProductModel[]>> =>{
    try {
        const response = await requestConfig(
            'products',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const createproductApi = async (productDto : FormData): Promise<ResponseSuccess<ProductModel>> =>{
    try {
        const response = await requestConfig(
            'products',
            Method.POST,
            productDto,
            ContentType.FORM_DATA
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const updatePatchProduct = async (id : number = -1,productDto : ProductDto): Promise<ResponseSuccess<ProductModel>> =>{
    try {
        const response = await requestConfig(
            'products/' + id,
            Method.PATCH,
            productDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const deleteProductApi = async (id : number = -1) : Promise<ResponseSuccess<ProductModel>> =>{
    try {
        const response = await requestConfig(
            'products/' + id,
            Method.DELETE,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const getProductById = async (productId: number = -1): Promise<ResponseSuccess<ProductResponse>> => {
    try {
        const response = await requestConfig(
            'products/' + productId,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}