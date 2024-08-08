
import { UserModel } from "../model/user.model";
import { ResponseSuccess } from "../dto/responses/response.success";
import requestConfig, { ContentType, Method } from "../congigurations/axios.config";

export const getUserByEmail = async ( email : string) : Promise<ResponseSuccess<UserModel>>  => {
    try {
        const response  = await requestConfig(
            `users/${email}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        return response.data; // Assuming response.data is of type ResponseSuccess<CategoryModel>
    } catch (error) {
        return Promise.reject(error);
    }
};

export const saveUserToLocalStorage =(user: UserModel) => {
    localStorage.setItem('user', JSON.stringify(user));
}