import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { ProviderDto } from "../dto/requests/provider.dto";
import { ResponseSuccess } from "../dto/responses/response.success";
import { ProviderModel } from "../model/privoder.model";

export const getAllProviders = async () : Promise<ResponseSuccess<ProviderModel[]>> =>{
    try {
        const response = await requestConfig(
            'providers',
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createProviderApi = async (providerDto: ProviderDto) : Promise<ResponseSuccess<ProviderModel>> =>{
    try {
        const response = await requestConfig(
            'providers',
            Method.POST,    
            providerDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const updateProviderApi = async (id:number =-1,providerDto: ProviderDto) : Promise<ResponseSuccess<ProviderModel>> =>{
    try {
        const response = await requestConfig(
            'providers/'+id,
            Method.PATCH,    
            providerDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const deleteProviderApi = async (id:number=-1) : Promise<ResponseSuccess<ProviderModel>> =>{
    try {
        const response = await requestConfig(
            'providers',
            Method.DELETE,    
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}