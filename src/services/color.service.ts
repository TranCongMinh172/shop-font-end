import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ResponseSuccess } from "../dto/responses/response.success";
import { ColorModel } from "../model/color.model";


export const getAllColors = async () : Promise<ResponseSuccess<ColorModel[]>>  => {
    try {
        const response  = await requestConfig(
            'colors',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};