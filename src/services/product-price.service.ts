import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ProductPriceDto } from "../dto/requests/product-price.dto";

import { ResponseSuccess } from "../dto/responses/response.success";
import { ProductPriceModel } from "../model/product-price.model";


export const getAllProductPricesByProductId = async (productId : number): Promise<ResponseSuccess<ProductPriceModel[]>> => {
    try {
        const response = await requestConfig(
            `product-prices/${productId}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createProductPrice = async (productPriceDto: ProductPriceDto): Promise<ResponseSuccess<ProductPriceModel>> => {
    try {
        const response = await requestConfig(
            'product-prices',
            Method.POST,
            productPriceDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteProductPrice = async (id: number): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `product-prices/${id}`,
            Method.DELETE,
            [],
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateProductPrice = async (id: number, productPriceDto: ProductPriceDto): Promise<ResponseSuccess<ProductPriceModel>> => {
    try {
        const response = await requestConfig(
            `product-prices/${id}`,
            Method.PUT,
            productPriceDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}