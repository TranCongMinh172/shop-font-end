import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ProductUpdateDto } from "../dto/requests/product-update.dto";
import { PageResponse } from "../dto/responses/page-response";
import { ProductResponse } from "../dto/responses/product-response";
import { ProductUserResponse } from "../dto/responses/product-user-response";
import { ResponseSuccess } from "../dto/responses/response.success";
import { ProductModel } from "../model/product.model";

export const createProduct = async (productDto: FormData): Promise<ResponseSuccess<ProductModel>> => {
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

export const updateProduct = async (id: number, productDto: ProductUpdateDto): Promise<ResponseSuccess<ProductModel>> => {
    try {
        const response = await requestConfig(
            `products/${id}`,
            Method.PUT,
            productDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updatePatch = async (id: number, fields: any): Promise<ResponseSuccess<ProductModel>> => {
    try {
        const response = await requestConfig(
            `products/${id}`,
            Method.PATCH,
            fields,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}



export const getAllProducts = async (): Promise<ResponseSuccess<ProductModel[]>> => {
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

export const getPageProducts = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult : string = 'sort=""';
    let searchResult : string = 'search=""';
    
    if(search.length > 0){
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }
    
    if(sort.length > 0){
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/page-product?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getPromontionProducts = async (pageNo: number = 1, pageSize: number = 40, search: {
    field: string;
    operator: string;
    value: string;
}[] = [],
    sort: {
        field: string;
        order: string;
    }[] = []): Promise<ResponseSuccess<PageResponse<ProductUserResponse[]>>> => {
    let sortResult : string = 'sort=""';
    let searchResult : string = 'search="promontion"';
    
    if(search.length > 0){
        searchResult = search.map(s => `search=${s.field}${s.operator}${s.value}`).join('&');
    }
    
    if(sort.length > 0){
        sortResult = sort.map(s => `sort=${s.field}:${s.order}`).join('&');
    }

    try {
        const response = await requestConfig(
            `products/promotion-product?pageNo=${pageNo}&pageSize=${pageSize}&${sortResult}&${searchResult}`,
            Method.GET,
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