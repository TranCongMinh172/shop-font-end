import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginResponse } from "../../../dto/responses/login-response";
import { saveToken } from "../../../services/token.service";
import { ResponseSuccess } from "../../../dto/responses/response.success";
import { UserModel } from "../../../model/user.model";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";
import { getCookie } from "../../../utils/cookie-handle";

function LoginSuccess() {
    const navigate  = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    // const accessToken = queryParams.get("accessToken");
    // const refreshToken = queryParams.get("refreshToken");
    const email = queryParams.get("email");
    const historyPath = localStorage.getItem("historyPath");

    useEffect(()=>{
        (async()=>{
            const accessToken = getCookie('accessToken');
            console.log(accessToken);
            const refreshToken = getCookie('refreshToken');
            if(accessToken && refreshToken && email){
                const loginResponse : LoginResponse ={
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
                try {
                    saveToken(loginResponse);
                    const res: ResponseSuccess<UserModel> = await getUserByEmail(email);
                    console.log(res);
                    const user : UserModel = res.data;
                    console.log(user);
                    saveUserToLocalStorage(user); 
                } catch (error) {
                    console.log(error);
                    navigate("/auth/login");
                }
                navigate(historyPath || "/");
                localStorage.removeItem("historyPath");
            }else{
                navigate("/auth/login");
            }
        })();
    },[])
    return null;
}

export default LoginSuccess;