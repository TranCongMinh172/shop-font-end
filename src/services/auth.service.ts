import { apiUrl } from "../congigurations/api-url";
import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { LoginRequestDto } from "../dto/requests/login-request.dto";
import { RegisterRequestDto } from "../dto/requests/register-request.dto";
import { VerifyEmail } from "../dto/requests/verify-email";
import { LoginResponse } from "../dto/responses/login-response";
import { ResponseSuccess } from "../dto/responses/response.success";

export const register = async (registerRequestDto : RegisterRequestDto) : Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            "auth/register",
            Method.POST,
            registerRequestDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const verifyEmail = async (verifyEmail : VerifyEmail) : Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            "auth/verify-email",
            Method.POST,
            verifyEmail,
            ContentType.JSON,
            true
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const login = async (loginRequestDto : LoginRequestDto) : Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            "auth/login",
            Method.POST,
            loginRequestDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const loginWithSocial = (provider: string) => {
    window.location.href = `${apiUrl}/oauth2/authorization/${provider}`
}