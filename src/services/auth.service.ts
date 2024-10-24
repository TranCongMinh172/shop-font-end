import { apiUrl } from "../congigurations/api-url";
import requestConfig, { ContentType, Method } from "../congigurations/axios.config";
import { LoginRequestDto } from "../dto/requests/login-request.dto";
import { RegisterRequestDto } from "../dto/requests/register-request.dto";
import { ResetPasswordRequest } from "../dto/requests/reset-password-request";
import { VerifyEmail } from "../dto/requests/verify-email";
import { VerifyEmailDto } from "../dto/requests/verify-email.dto";
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
export const getVeriryCode = async (email: string): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/get-verify-code/${email}`,
            Method.GET,
            [],
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const verifyResetPassword = async (verifyEmailDto: VerifyEmailDto): Promise<ResponseSuccess<string>> => {
    try {
        const response = await requestConfig(
            `auth/verify-reset-password-code`,
            Method.POST,
            verifyEmailDto,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const resetPassword = async (resetPasswordRequest: ResetPasswordRequest): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/reset-password`,
            Method.POST,
            resetPasswordRequest,
            ContentType.JSON
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const lougout = async (accessToken: string) : Promise<ResponseSuccess<string | null>> => {
    try {
        const response = await requestConfig(
            `auth/logout`,
            Method.POST,
            accessToken,
            ContentType.TEXT_PLAIN
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
export const refreshToken = async (refreshToken?: string): Promise<ResponseSuccess<LoginResponse>> => {
    try {
        const response = await requestConfig(
            `auth/refresh-token`,
            Method.POST,
            refreshToken,
            ContentType.TEXT_PLAIN
        );
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const loginWithSocial = (provider: string) => {
    window.location.href = `${apiUrl}/oauth2/authorization/${provider}`
}