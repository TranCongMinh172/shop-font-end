import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { CategoryDto } from "../dto/requests/categorydto";
import { ResponseSuccess } from "../dto/responses/response.success";
import { CategoryModel } from "../model/category.model";

export const createCategory = async (categoryDto:CategoryDto) : Promise<ResponseSuccess<CategoryModel>>  => {
    try {
        const response  = await requestConfig(
            'categories',
            Method.POST,
            categoryDto,
            ContentType.JSON
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getAllCategories = async () : Promise<ResponseSuccess<CategoryModel[]>>  => {
    try {
        const response  = await requestConfig(
            'categories',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};
export const updatePatchCategory = async (id: number =-1,categoryDto:CategoryDto) : Promise<ResponseSuccess<CategoryModel>>  => {
    try {
        const response  = await requestConfig(
            'categories/'+id,
            Method.PATCH,
            categoryDto,
            ContentType.JSON
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};
export const deleteCategoryApi = async (id: number = -1) : Promise<ResponseSuccess<string>>  => {
    try {
        const response  = await requestConfig(
            'categories/'+id,
            Method.DELETE,
            [],
            ContentType.JSON
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};