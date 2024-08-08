import { LoginResponse } from "../dto/responses/login-response";

export const saveToken = (loginResponse: LoginResponse) =>{
    localStorage.setItem('token', JSON.stringify(loginResponse));
}

export const getToken=() =>{
    const token = localStorage.getItem('token');
    if(token){
        return JSON.parse(token)
    }
    return null;
}