
import { Role, UserModel } from "../model/user.model";
import { ResponseSuccess } from "../dto/responses/response.success";
import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { decrypt, encrypt } from "../utils/crypt-data";
import { UserUpdateDto } from "../dto/requests/user-update.dto";
import { ChangePasswordRequest } from "../dto/requests/change-password-request";
import { LoginResponse } from "../dto/responses/login-response";
import { saveToken } from "./token.service";

export const getUserByEmail = async (email: string): Promise<ResponseSuccess<UserModel>> => {
    try {
        const response = await requestConfig(
            `users/${email}`,
            Method.GET,
            [],
            ContentType.JSON,
            true
        );
        console.log(response);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const saveUserToLocalStorage =(user: UserModel) => {
    const encryptUser: string = encrypt(JSON.stringify(user));
    console.log(encryptUser)
    localStorage.setItem('user', encryptUser);
}
export const isLogin = (role?: Role): boolean => {
    const user: UserModel | null = getUserFromLocalStorage();
    if (user) {
        return role ? user.role === role : true;
    }
    return false;
}
export const getUserFromLocalStorage = (): UserModel | null => {
    const userStr: string | null = localStorage.getItem('user');
    if (userStr) {
        const decryptUser: string = decrypt(userStr);
        if (decryptUser !== "") {

            return JSON.parse(decryptUser);
        }
    }
    return null;
}
export const uploadAvt = async (avatar: File): Promise<ResponseSuccess<string>> => {
    const formData: FormData = new FormData();
    formData.append('avatar', avatar);
    try {
        const response = await requestConfig(
            `users/upload`,
            Method.POST,
            formData,
            ContentType.FORM_DATA,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const updateUser = async (email: string, userUpdateDto: UserUpdateDto): Promise<ResponseSuccess<UserModel>> => {
    try {
        const response = await requestConfig(
            `users/${email}`,
            Method.PUT,
            userUpdateDto,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const changePassword = async (changePasswordRequest: ChangePasswordRequest): Promise<ResponseSuccess<LoginResponse>> => {
    console.log(changePasswordRequest)
    try {
        const response = await requestConfig(
            `users/change-password`,
            Method.POST,
            changePasswordRequest,
            ContentType.JSON,
            true
        );
        saveToken(response.data.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}