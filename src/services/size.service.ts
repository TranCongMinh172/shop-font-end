import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ResponseSuccess } from "../dto/responses/response.success";
import { SizeModel } from "../model/size.model";

export const getAllSizes = async () : Promise<ResponseSuccess<SizeModel[]>>  => {
    try {
        const response  = await requestConfig(
            'sizes',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};